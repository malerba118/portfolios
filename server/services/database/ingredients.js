import admin from "./firebase";
import {
  toList,
  toData,
  assertAdmin,
  assertAuthenticated,
  assertValid,
  assertResourceExists,
  now,
} from "./utils";
import joi from "joi";
import * as schemas from "./schemas";

const firestore = admin.firestore();

export default ({ db, user }) => {
  const ingredientsCol = firestore.collection("ingredients");

  const list = async () => {
    const ingredients = toList(await ingredientsCol.get());
    return ingredients;
  };

  const get = async (id) => {
    const ingredient = await ingredientsCol.doc(id).get();
    assertResourceExists(ingredient);
    return toData(ingredient);
  };

  const create = async ({
    name,
    dailyLimitTbs,
    grade,
    shortDescription,
    description,
    nutrition,
    organic,
    vegan,
    gluten,
  }) => {
    // assertAuthenticated(user);
    // assertAdmin(user);
    let ingredientData = {
      name,
      dailyLimitTbs,
      grade,
      shortDescription,
      description,
      nutrition,
      organic,
      vegan,
      gluten,
    };
    ingredientData.createdAt = now();

    assertValid(ingredientData, schemas.Ingredient);

    const ingredientDocRef = await ingredientsCol.add(ingredientData);
    const ingredientDoc = await ingredientDocRef.get();
    return toData(ingredientDoc);
  };

  return {
    list,
    get,
    create,
  };
};
