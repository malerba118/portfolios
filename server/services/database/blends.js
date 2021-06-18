import admin from "./firebase";
import {
  now,
  toList,
  toData,
  assertAuthenticated,
  assertValid,
  toDisplayUser,
  assertResourceExists,
} from "./utils";
import joi from "joi";
import * as schemas from "./schemas";
import { UnauthorizedError } from "./errors";

const firestore = admin.firestore();

const validators = {
  create: joi
    .object({
      name: joi.string().required(),
      ingredients: joi
        .array()
        .items(
          joi
            .object({
              ingredientId: joi.string().required(),
              percentage: joi.number().required(),
            })
            .required()
        )
        .required(),
    })
    .required(),
};


export default ({ db, user }) => {
  const blendsCol = firestore.collection("blends");

  const hydrateIngredient = async ({ ingredientId, percentage }) => {
    return {
      ingredient: await db.ingredients.get(ingredientId),
      percentage
    }
  }

  const create = async ({ name, ingredients, published }) => {
    // assertAuthenticated(user);
    // assertValid(blendData, validators.create);

    // remove ingredients with no value
    ingredients = ingredients.filter(ing => ing.percentage > 0)
    // hydrate ingredient ids from db
    ingredients = await Promise.all(ingredients.map(hydrateIngredient))

    let blendData = { name, ingredients, published };
    blendData.createdBy = user ? toDisplayUser(user) : null;
    blendData.createdAt = now();
    blendData.averageRating = 0;
    blendData.visits = 0;
    blendData.favoriteCount = 0;
    blendData.orderCount = 0;
    blendData.reviews = [];
    blendData.comments = [];
    blendData.key = blendData.ingredients
      .map((obj) => obj.percentage + obj.ingredient.id)
      .join("$");

    if (blendData.published === undefined) {
      blendData.published = false;
    }

    assertValid(blendData, schemas.Blend);

    const blendDocRef = await blendsCol.add(blendData);
    const blendDoc = await blendDocRef.get();
    return toData(blendDoc);
  };

  const list = async ({ published = null, own = false } = {}) => {
    let query = blendsCol;

    if (published !== null) {
      query = query.where("published", "==", published);
    }
    if (own) {
      query = query.where("createdBy.id", "==", user.id);
    }

    return toList(await query.get());
  };

  const get = async (id) => {
    const blend = await blendsCol.doc(id).get();
    // not allowed to view other's private blends
    if (blend.createdBy.id !== user.id && !blend.published) {
      throw new UnauthorizedError();
    }
    assertResourceExists(blend);
    return toData(blend);
  };

  return {
    create,
    list,
    get,
  };
};
