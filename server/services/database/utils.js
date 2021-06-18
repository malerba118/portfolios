import admin from "./firebase";
import {
  UnauthenticatedError,
  ResourceNotFoundError,
  ValidationError,
  UnauthorizedError,
} from "./errors";

export const now = () => {
  return admin.firestore.Timestamp.fromDate(new Date());
};

export const toList = (collectionSnapshot) => {
  return collectionSnapshot.docs.map((doc) => toData(doc));
};

export const toData = (docSnapshot) => ({
  id: docSnapshot.id,
  ...docSnapshot.data(),
});

export const assertAuthenticated = (user) => {
  if (!user) {
    throw new UnauthenticatedError();
  }
};

export const assertResourceExists = (resource) => {
  if (!resource || !resource.exists) {
    throw new ResourceNotFoundError();
  }
};

export const assertValid = (resource, schema) => {
  const { error } = schema.validate(resource);
  if (error) {
    console.error({ resource: JSON.stringify(resource, null, 2) })
    throw new ValidationError(error.message, error.details);
  }
};

export const assertAdmin = (user) => {
  if (!user.roles.includes("admin")) {
    throw new UnauthorizedError();
  }
};

export const assertOwner = (user, resource) => {
  if (resource.createdBy !== user.id) {
    throw new UnauthorizedError();
  }
};

export const toDisplayUser = (user) => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
});

const pricing = {
  size: {
    "8oz": 10,
    "12oz": 15,
    "16oz": 20,
  },
  grade: {
    premium: {
      "8oz": 3,
      "12oz": 4,
      "16oz": 5,
    },
    standard: {
      "8oz": 1,
      "12oz": 2,
      "16oz": 3,
    },
  },
};

const calcOrderItemPrice = (orderItem) => {
  let price = pricing.size[orderItem.size];
  orderItem.ingredients.forEach(({ ingredient }) => {
    price += pricing.grade[ingredient.grade][orderItem.size];
  });
  return price * orderItem.quantity;
};

export const calcOrderPrice = (order) => {
  let price = 0;
  order.items.forEach((item) => {
    price += calcOrderItemPrice(item);
  });
  return price;
};
