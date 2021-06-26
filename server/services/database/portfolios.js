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
  patch: joi.object({
    subdomain: joi.string(),
    draft: joi.object({
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
          })
        ),
      }),
    }),
  }),
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

  const patch = async (data) => {
    assertAuthenticated(user);
    assertValid(data, schemas.patch);
    let portfolio = await getOrCreate();
    await portfoliosCol.doc(portfolio.id).update({
      ...portfolio,
      ...data,
    });
    return getOrCreate();
  };

  return {
    getOrCreate,
    getBySubdomain,
    patch,
  };
};
