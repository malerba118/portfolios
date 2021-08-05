import admin from "./firebase";
import {
  toData,
  assertAuthenticated,
  assertResourceExists,
  assertValid,
} from "./utils";
import { nanoid } from "nanoid";
import { ResourceNotFoundError, UnauthorizedError } from "./errors";
import joi from "joi";

const MediasSchema = joi.object({
  items: joi.array().items(
    joi.object({
      id: joi.string().required(),
      rawUrl: joi.string().allow(null),
      processedUrl: joi.string().allow(null),
      crop: joi
        .object({
          unit: joi.string(),
          x: joi.number(),
          y: joi.number(),
          width: joi.number(),
          height: joi.number(),
        })
        .allow(null),
      zoom: joi.number().allow(null),
      width: joi.number().allow(null),
      height: joi.number().allow(null),
    })
  ),
});

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
        summary: joi.string().required().allow(""),
        description: joi.string().required().allow(""),
        images: MediasSchema,
      }),
      contact: joi.object({
        email: joi.string().required().allow(""),
        phone: joi.string().required().allow(""),
      }),
      projects: joi.array().items(
        joi.object({
          id: joi.string().required(),
          name: joi.string().required().allow(""),
          summary: joi.string().required().allow(""),
          description: joi.string().required().allow(""),
          startDate: joi.date().required().allow(null),
          endDate: joi.date().required().allow(null),
          images: MediasSchema,
        })
      ),
    }),
  }),
  updateSubdomain: joi.string().required(),
  isSubdomainAvailable: joi.string().required(),
};

const firestore = admin.firestore();

const getDefaultPortfolio = ({ user }) => {
  const portfolio = {
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
          summary: "",
          description: "",
          images: {
            items: [],
          },
        },
        contact: {
          email: "",
          phone: "",
        },
        projects: [
          {
            id: nanoid(),
            name: "",
            summary: "",
            description: "",
            startDate: null,
            endDate: null,
            images: {
              items: [],
            },
          },
        ],
      },
    },
    published: null,
    live: false,
  };
  assertValid(portfolio.draft, schemas.updateDraft);
  return portfolio;
};

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
    if (db.auth.isSuperAdmin()) {
      return toData(portfolioDoc);
    }
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
    if (portfolioDoc && portfolioDoc.exists) {
      // unavailable if owned by another user
      if (portfolioDoc.data().owner !== user.id) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const updateSubdomain = async (subdomain) => {
    assertAuthenticated(user);
    assertValid(subdomain, schemas.updateSubdomain);
    let portfolio = await getOrCreate();
    const available = await isSubdomainAvailable(subdomain);
    if (available) {
      await portfoliosCol.doc(portfolio.id).update({
        ...portfolio,
        subdomain,
      });
    } else {
      throw new ValidationError();
    }
    return getOrCreate();
  };

  const publish = async (subdomain) => {
    assertAuthenticated(user);
    let portfolio = await getOrCreate();
    if (!portfolio.live) {
      throw new UnauthorizedError();
    }
    portfolio = await updateSubdomain(subdomain);
    await portfoliosCol.doc(portfolio.id).update({
      ...portfolio,
      published: portfolio.draft,
    });
    return getOrCreate();
  };

  return {
    getOrCreate,
    getBySubdomain,
    isSubdomainAvailable,
    updateDraft,
    updateSubdomain,
    publish,
  };
};
