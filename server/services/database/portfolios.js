import admin from "./firebase";
import {
  toData,
  assertAuthenticated,
} from "./utils";
import { nanoid } from 'nanoid'

const firestore = admin.firestore();

const getDefaultPortfolio = ({ user }) => ({
  subdomain: null,
  owner: user.id,
  draft: {
    template: null,
    content: {
        projects: [{
            id: nanoid(),
            name: 'Example Project',
        }],
    }
  },
  published: null
})

export default ({ db, user }) => {
  const portfoliosCol = firestore.collection("portfolios");

  const getOrCreate = async () => {
    assertAuthenticated(user);
    
    let portfoliosSnapshot = await portfoliosCol.where('owner', '==', user.id).get();
    let portfolioDoc = portfoliosSnapshot.docs[0]
    if (!portfolioDoc || !portfolioDoc.exists) {
      const data = getDefaultPortfolio({ user: db.user })
      const portfolioDocRef = await portfoliosCol.add(data);
      portfolioDoc = await portfolioDocRef.get();
    }
    
    return toData(portfolioDoc)
  };

  return {
    getOrCreate
  };
};
