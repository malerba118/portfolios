## Rough Draft of DB Schema

```javascript
const pricing = {
  size: {
    sm: 10,
    md: 20
  },
  grade: {
    premium: {
      sm: 1,
      md: 2,
    },
  }
}
// base comes with 5 regular ingredients (premium are extra)
// EG:
// sm+1
// sm+2
// sm+3

const users = {
  uid: '',
  name: '',
  email: '',
  favorites: [blendIds],
  cart: [{
    quantity,
    blendId,
    // ingredients: [{
    //   ingredient: {
    //     grade: 'premium',
    //     name,
    //     description,
    //     sodium,
    //     fat,
    //     protein,
    //     type,
    //     organic,
    //     vegan,
    //     gluten
    //   },
    //   percentage
    // }],
    size,
  }]
}

const blends = {
  id,
  key,
  name,
  ingredients: [{
    ingredient: {
      name,
      description,
      sodium,
      fat,
      protein
    },
    percentage
  }],
  creator,
  averageRating,
  visits,
  favoriteCount,
  orderCount,
  reviews: [{
    rating,
    comment,
    author
  }],
  comments: [{
    comment,
    author,
    replies: [{
      comment,
      author
    }]
  }],
  published
}

const orders = {
  user: uid,
  stripeOrderId,
  amount,
  currency,
  items: [{
    quantity,
    blendId,
    ingredients: [{
      ingredient: {
        name,
        description,
        sodium,
        fat,
        protein
      },
      percentage
    }],
    size,
  }],
}

const ingredients = {
  id,
  grade: 'premium',
  name,
  shortDescription,
  description,
  sodium,
  fat,
  protein,
  type,
  organic,
  vegan,
  gluten,
  pairings: [ingredientIds],
}
```