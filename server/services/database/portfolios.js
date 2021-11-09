import admin from "./firebase";
import {
  toData,
  assertAuthenticated,
  assertResourceExists,
  assertValid,
} from "./utils";
import { nanoid } from "nanoid";
import { ResourceNotFoundError, UnauthorizedError } from "./errors";
import joi, { ValidationError } from "joi";
import { hasSubscription, isLocked, isValidSubdomain } from "shared/utils/data";

const MediasSchema = joi.object({
  items: joi.array().items(
    joi.object({
      id: joi.string().required(),
      type: joi.string().allow(null, ""),
      name: joi.string().allow(null, ""),
      rawUrl: joi.string().allow(null, ""),
      processedUrl: joi.string().allow(null, ""),
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

const TemplateSettingsMap = joi.object({
  os: joi.object({
    headingFont: joi.string(),
    paragraphFont: joi.string(),
    palette: joi.string(),
    wallpaper: MediasSchema,
  }),
  madrid: joi.object({
    headingFont: joi.string(),
    paragraphFont: joi.string(),
    palette: joi.string(),
  }),
  skrol: joi.object({
    headingFont: joi.string(),
    paragraphFont: joi.string(),
    palette: joi.string(),
  }),
  reveal: joi.object({
    headingFont: joi.string(),
    paragraphFont: joi.string(),
    palette: joi.string(),
  }),
  circles: joi.object({
    headingFont: joi.string(),
    paragraphFont: joi.string(),
    palette: joi.string(),
  }),
  gallery: joi.object({
    headingFont: joi.string(),
    paragraphFont: joi.string(),
    palette: joi.string(),
  }),
});

const ResumeSchema = joi.object({
  name: joi.string(),
  url: joi.string(),
});

const SocialLinksSchema = joi.object({
  items: joi.array().items(
    joi.object({
      id: joi.string().required(),
      platform: joi.string().allow(null),
      url: joi.string().allow(null, ""),
    })
  ),
});

const schemas = {
  updateDraft: joi.object({
    template: joi.string(),
    templateSettingsMap: TemplateSettingsMap,
    content: joi.object({
      about: joi.object({
        firstName: joi.string().required().allow(""),
        lastName: joi.string().required().allow(""),
        title: joi.string().required().allow(""),
        summary: joi.string().required().allow(""),
        description: joi.string().required().allow(""),
        images: MediasSchema,
        resume: ResumeSchema.allow(null),
        logo: MediasSchema,
      }),
      contact: joi.object({
        email: joi.object({
          hidden: joi.boolean().required(),
          value: joi.string().required().allow(""),
        }),
        phone: joi.object({
          hidden: joi.boolean().required(),
          value: joi.string().required().allow(""),
        }),
        socialLinks: SocialLinksSchema,
      }),
      projects: joi.array().items(
        joi.object({
          id: joi.string().required(),
          name: joi.string().required().allow(""),
          summary: joi.string().required().allow(""),
          description: joi.string().required().allow(""),
          startDate: joi.date().required().allow(null).allow("present"),
          endDate: joi.date().required().allow(null).allow("present"),
          images: MediasSchema,
        })
      ),
    }),
  }),
  updateSubdomain: joi.string().required(),
  draftLastSaved: joi.date().allow(null),
  isSubdomainAvailable: joi.string().required(),
};

const firestore = admin.firestore();

const getDefaultPortfolio = ({ user }) => {
  const portfolio = {
    subdomain: null,
    owner: user.id,
    draft: {
      template: "madrid",
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
          resume: null,
          logo: {
            items: [],
          },
        },
        contact: {
          email: {
            hidden: false,
            value: "",
          },
          phone: {
            hidden: false,
            value: "",
          },
          socialLinks: {
            items: [],
          },
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
    advertisementsDisabled: false,
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

  const getById = async (id) => {
    let portfoliosSnapshot = await portfoliosCol.where("id", "==", id).get();
    let portfolioDoc = portfoliosSnapshot.docs[0];
    assertResourceExists(portfolioDoc);
    const data = portfolioDoc.data();
    if (db.auth.isSuperAdmin()) {
      return toData(portfolioDoc);
    }
    if (data.owner !== user.id) {
      throw new ResourceNotFoundError();
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
    if (data.owner !== user.id) {
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
      draftLastSaved: new Date().toJSON(),
    });
    return getOrCreate();
  };

  const restoreDraft = async () => {
    assertAuthenticated(user);
    let portfolio = await getOrCreate();
    assertValid(portfolio.published, schemas.updateDraft);
    await portfoliosCol.doc(portfolio.id).update({
      ...portfolio,
      draft: portfolio.published,
      draftLastSaved: new Date().toJSON(),
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
    subdomain = subdomain.toLowerCase();
    assertAuthenticated(user);
    assertValid(subdomain, schemas.updateSubdomain);
    let portfolio = await getOrCreate();
    if (!isValidSubdomain(subdomain)) {
      throw new ValidationError("Subdomain is invalid");
    }
    const available = await isSubdomainAvailable(subdomain);
    if (available) {
      await portfoliosCol.doc(portfolio.id).update({
        ...portfolio,
        subdomain,
      });
    } else {
      throw new ValidationError("Subdomain is unavailable");
    }
    return getOrCreate();
  };

  const publish = async (subdomain) => {
    assertAuthenticated(user);
    let portfolio = await getOrCreate();
    if (!hasSubscription(user) && isLocked(portfolio?.draft?.template)) {
      throw new ValidationError(
        "You will need to upgrade in order to publish while using a locked template"
      );
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
    getById,
    isSubdomainAvailable,
    updateDraft,
    restoreDraft,
    updateSubdomain,
    publish,
  };
};
