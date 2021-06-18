import admin from "./firebase";
import { getOrCreateUser } from "./users";
import { assertValid, now, toData } from "./utils";
import Database from "./index";
import * as schemas from "./schemas";

const firestore = admin.firestore();

export const SeededTestDatabase = async (...args) => {
  const db = await Database(...args);

  const deleteCollection = (path) => {
    var batch = firestore.batch();
    return firestore
      .collection(path)
      .listDocuments()
      .then((val) => {
        val.map((val) => {
          batch.delete(val);
        });

        return batch.commit();
      });
  };

  const deleteCollections = async () => {
    const collections = await firestore.listCollections();
    for (const col of collections) {
      await deleteCollection(col.path);
    }
  };

  // const createIngredient = async (ingredientData) => {
  //   ingredientData.createdAt = now();
  //   assertValid(ingredientData, schemas.Ingredient);
  //   const ingredientDocRef = await firestore
  //     .collection("ingredients")
  //     .add(ingredientData);
  //   const ingredientDoc = await ingredientDocRef.get();
  //   return toData(ingredientDoc);
  // };

  const initUsers = async () => {
    const users = {};
    users.admin = await getOrCreateUser({
      uid: "123",
      email: "admin@gmail.com",
      roles: ["admin"],
    });
    users.user1 = await getOrCreateUser({
      uid: "234",
      email: "234@gmail.com",
    });
    users.user2 = await getOrCreateUser({
      uid: "345",
      email: "345@gmail.com",
    });
    return users;
  };

  const initIngredients = async () => {
    const ingredients = {};
    ingredients.turmeric = await db.ingredients.create({
      name: "turmeric",
      dailyLimitTbs: 0.5,
      grade: "premium",
      shortDescription: "Organic turmeric powder",
      description:
        "This organic turmeric is sourced from Thailand and is non-gmo.",
      nutrition: {
        sodium: 0.01,
        protein: 0.3,
        monounsaturatedFat: 3,
        polyunsaturatedFat: null,
        saturatedFat: 0,
        cholesterol: 0,
        carbohydrates: 0,
        fiber: null,
        sugars: 1,
        protein: 1,
      },
      organic: true,
      vegan: true,
      gluten: false,
    });
    ingredients.ginger = await db.ingredients.create({
      name: "ginger",
      dailyLimitTbs: 0.5,
      grade: "standard",
      shortDescription: "Organic ginger powder",
      description:
        "This organic ginger is sourced from Vietnam and is non-gmo.",
      nutrition: {
        sodium: 0.01,
        protein: 0.3,
        monounsaturatedFat: 0,
        polyunsaturatedFat: null,
        saturatedFat: 0,
        cholesterol: 0,
        carbohydrates: 0,
        fiber: null,
        sugars: 1,
        protein: 1,
      },
      organic: true,
      vegan: true,
      gluten: false,
    });
    return ingredients;
  };

  await deleteCollections();

  const data = {
    users: await initUsers(),
    ingredients: await initIngredients(),
  };

  const initOrders = async () => {
    const orders = {};
    orders.order1 = await db.orders.create({
      items: [
        {
          quantity: 2,
          blendId: null,
          ingredients: [
            {
              // grab seeded ingredient from test db
              ingredient: data.ingredients.turmeric,
              percentage: 10,
            },
            {
              ingredient: data.ingredients.ginger,
              percentage: 20,
            },
          ],
          size: "8oz",
        },
      ],
    });
    return orders;
  };

  data.orders = await initOrders();

  return {
    ...db,
    deleteCollection,
    deleteCollections,
    data,
  };
};

export const expectKeys = (obj, keys) => {
  keys.forEach((k) => {
    expect(obj[k]).toBeDefined();
  });
};

export const expectToMatchSchema = (obj, schema) => {
  const { error } = schema.validate(obj);
  expect(error).toBeUndefined();
};
