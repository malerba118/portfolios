import admin from "./firebase";
import {
  toData,
  assertAuthenticated,
  assertResourceExists,
  assertValid,
} from "./utils";
import { nanoid } from "nanoid";
import { ResourceNotFoundError } from "./errors";
import joi from "joi";

const schemas = {
  updateDraft: joi.object({
    template: joi.object({
      name: joi.string().required(),
      version: joi.string().required(),
    }),
    content: joi.object({
      about: joi.object({
        firstName: joi.string().required().allow(""),
        lastName: joi.string().required().allow(""),
        title: joi.string().required().allow(""),
      }),
      projects: joi.array().items(
        joi.object({
          id: joi.string().required(),
          name: joi.string().required().allow(""),
          summary: joi.string().required().allow(""),
          description: joi.string().required().allow(""),
          images: joi.object({
            items: joi.array().items(
              joi.object({
                id: joi.string().required(),
                url: joi.string().allow(null),
              })
            ),
          }),
        })
      ),
    }),
  }),
  updateSubdomain: joi.string().required(),
  isSubdomainAvailable: joi.string().required(),
};

const firestore = admin.firestore();

const getDefaultPortfolio = ({ user }) => ({
  subdomain: null,
  owner: user.id,
  draft: {
    template: {
      name: "venice",
      version: "v1",
    },
    content: {
      about: {
        firstName: "",
        lastName: "",
        title: "",
      },
      projects: [
        {
          id: nanoid(),
          name: "Example Project",
          summary: "",
          description: "",
        },
      ],
    },
  },
  published: null,
  live: false,
});

export default ({ db, user }) => {
  const portfoliosCol = firestore.collection("portfolios");

  const getOrCreate = async () => {
    assertAuthenticated(user);

    let portfoliosSnapshot = await portfoliosCol
      .where("owner", "==", user.id)
      .get();
    let portfolioDoc = portfoliosSnapshot.docs[0];
    if (!portfolioDoc || !portfolioDoc.exists) {
      const data = getDefaultPortfolio({ user: db.user });
      const portfolioDocRef = await portfoliosCol.add(data);
      portfolioDoc = await portfolioDocRef.get();
    }

    return toData(portfolioDoc);
  };

  const getBySubdomain = async (subdomain) => {
    let portfoliosSnapshot = await portfoliosCol
      .where("subdomain", "==", subdomain)
      .get();
    let portfolioDoc = portfoliosSnapshot.docs[0];
    assertResourceExists(portfolioDoc);
    const data = portfolioDoc.data();
    if (data.owner !== user.id && data.live !== true) {
      throw new ResourceNotFoundError();
    }
    return toData(portfolioDoc);
  };

  const updateDraft = async (data) => {
    assertAuthenticated(user);
    assertValid(data, schemas.updateDraft);
    let portfolio = await getOrCreate();
    await portfoliosCol.doc(portfolio.id).update({
      ...portfolio,
      draft: data,
    });
    return getOrCreate();
  };

  const isSubdomainAvailable = async (subdomain) => {
    assertAuthenticated(user);
    assertValid(subdomain, schemas.isSubdomainAvailable);
    let portfoliosSnapshot = await portfoliosCol
      .where("subdomain", "==", subdomain)
      .get();
    let portfolioDoc = portfoliosSnapshot.docs[0];
    return !(portfolioDoc && portfolioDoc.exists);
  };

  const updateSubdomain = async (subdomain) => {
    assertAuthenticated(user);
    assertValid(subdomain, schemas.updateSubdomain);
    let portfolio = await getOrCreate();
    const available = await isSubdomainAvailable(subdomain);
    if (available) {
      await portfoliosCol.doc(portfolio.id).update({
        ...portfolio,
        subdomain: data,
      });
    } else {
      throw new ValidationError();
    }
    return getOrCreate();
  };

  return {
    getOrCreate,
    getBySubdomain,
    isSubdomainAvailable,
    updateDraft,
    updateSubdomain,
  };
};
