import joi from "joi";

const common = {
  id: joi.string(),
  createdAt: joi.object().required(),
};

const Percentage = joi.number().min(0).max(100);
const Sizes = joi.string().valid("8oz", "12oz", "16oz");

export const User = joi.object({
  ...common,
  email: joi.string().required(),
  roles: joi.array().required(),
});

export const DisplayUser = joi.object({
  ...common,
  email: joi.string().required(),
});

export const Ingredient = joi.object({
  ...common,
  name: joi.string().required(),
  shortDescription: joi.string(),
  description: joi.string(),
  grade: joi.string().required(),
  organic: joi.boolean().required(),
  gluten: joi.boolean().required(),
  vegan: joi.boolean().required(),
  dailyLimitTbs: joi.number().required().allow(null),
  nutrition: joi.object({
    sodium: joi.number().required().allow(null),
    protein: joi.number().required().allow(null),
    monounsaturatedFat: joi.number().required().allow(null),
    polyunsaturatedFat: joi.number().required().allow(null),
    saturatedFat: joi.number().required().allow(null),
    cholesterol: joi.number().required().allow(null),
    carbohydrates: joi.number().required().allow(null),
    fiber: joi.number().required().allow(null),
    sugars: joi.number().required().allow(null),
    protein: joi.number().required().allow(null),
  }),
});

export const Blend = joi.object({
  ...common,
  key: joi.string().required(),
  name: joi.string().required(),
  ingredients: joi
    .array()
    .items(
      joi.object({
        ingredient: Ingredient,
        percentage: Percentage,
      })
    )
    .required(),
  createdBy: DisplayUser.allow(null),
  averageRating: joi.number().required(),
  visits: joi.number().required(),
  favoriteCount: joi.number().required(),
  orderCount: joi.number().required(),
  reviews: joi.array().required(),
  comments: joi.array().required(),
  published: joi.boolean().required(),
});

export const OrderItem = joi.object({
  quantity: joi.number().required().min(1),
  blendId: joi.string().required().allow(null),
  ingredients: joi
    .array()
    .items(
      joi.object({
        ingredient: Ingredient,
        percentage: Percentage,
      })
    )
    .required(),
  size: Sizes.required(),
});

export const Order = joi.object({
  ...common,
  user: DisplayUser.required().allow(null),
  checkoutSessionId: joi.string().required().allow(null),
  amount: joi.number().required(),
  items: joi.array().items(OrderItem).min(1).required(),
  status: joi.string().required(),
});
