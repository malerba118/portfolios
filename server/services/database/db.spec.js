import Database from "./index";
import {
  SeededTestDatabase,
  expectKeys,
  expectToMatchSchema,
} from "./test-utils";
import * as schemas from "./schemas";

// Mapping of fake tokens to user ids for verifyToken method
const tokens = {
  abc: {
    uid: "123",
  },
  def: {
    uid: "234",
  },
  ghi: {
    uid: "345",
  },
};

// Mock out verifyToken method and just return the logged in user info
jest.mock("./verify", () => ({
  verifyToken: jest.fn((token) => {
    if (!tokens[token]) {
      throw new Error("Invalid Token");
    }
    return tokens[token];
  }),
}));

// Will hold a bunch of different dbs that will
// allow us to operate on firestore as different users.
const dbs = {};

beforeAll(async () => {
  // Test db has a different shape than the rest.
  // This clears all data from the remote test firestore and repopulates
  // it with some initial users and ingredients.
  dbs.test = await SeededTestDatabase();

  // All the dbs below are what we want to test
  dbs.admin = await Database({ token: "abc" });
  dbs.user1 = await Database({ token: "def" });
  dbs.user2 = await Database({ token: "ghi" });
  dbs.anonymous = await Database();
});

describe("User One", () => {
  test("create private blend", async () => {
    const blend = await dbs.user1.blends.create({
      name: "Golden Milk Private",
      ingredients: [
        {
          // grab seeded ingredient from test db
          ingredient: dbs.test.data.ingredients.turmeric,
          percentage: 10,
        },
        {
          ingredient: dbs.test.data.ingredients.ginger,
          percentage: 20,
        },
      ],
      published: false,
    });
    expectToMatchSchema(blend, schemas.Blend);
  });

  test("create published blend", async () => {
    const blend = await dbs.user1.blends.create({
      name: "Golden Milk Published",
      ingredients: [
        {
          ingredient: dbs.test.data.ingredients.turmeric,
          percentage: 30,
        },
        {
          ingredient: dbs.test.data.ingredients.ginger,
          percentage: 20,
        },
      ],
      published: true,
    });
    expectToMatchSchema(blend, schemas.Blend);
  });

  test("create order without user", async () => {
    const order = await dbs.anonymous.orders.create({
      items: [
        {
          quantity: 2,
          blendId: null,
          ingredients: [
            {
              // grab seeded ingredient from test db
              ingredient: dbs.test.data.ingredients.turmeric,
              percentage: 10,
            },
            {
              ingredient: dbs.test.data.ingredients.ginger,
              percentage: 20,
            },
          ],
          size: "8oz",
        },
      ],
    });
    expectToMatchSchema(order, schemas.Order);
    expect(order.user).toEqual(null);
  });

  test("create order without blend", async () => {
    const order = await dbs.user1.orders.create({
      items: [
        {
          quantity: 2,
          blendId: null,
          ingredients: [
            {
              // grab seeded ingredient from test db
              ingredient: dbs.test.data.ingredients.turmeric,
              percentage: 10,
            },
            {
              ingredient: dbs.test.data.ingredients.ginger,
              percentage: 20,
            },
          ],
          size: "8oz",
        },
      ],
    });
    expectToMatchSchema(order, schemas.Order);
  });

  test("fetch own orders", async () => {
    const orders = await dbs.user1.orders.list();
    expect(orders).toHaveLength(1);
  });

  test("fetch published blends", async () => {
    const blends = await dbs.user1.blends.list({ published: true });
    expect(blends.length).toBeGreaterThan(0);
    expect(blends.every((b) => b.published)).toBeTruthy();
  });

  test("fetch own blends", async () => {
    const blends = await dbs.user1.blends.list({ own: true });
    expect(blends.length).toBeGreaterThan(0);
    expect(
      // grab seeded user from test db and get their id
      blends.every((b) => b.createdBy.id === dbs.test.data.users.user1.id)
    ).toBeTruthy();
    // both published and private blends included
    expect(blends.some((b) => !b.published)).toBeTruthy();
    expect(blends.some((b) => b.published)).toBeTruthy();
  });

  test("fetch self", async () => {
    const user = dbs.user1.user;
    expect(dbs.user1.user).toEqual(dbs.test.data.users.user1);
    expectToMatchSchema(user, schemas.User);
  });
});
