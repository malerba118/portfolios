import nookies from "nookies";
import Database from "server/services/database";

export const getCommonSsrProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const db = await Database({ token: cookies.token });
    let portfolio = null;
    if (db.auth.isAuthenticated()) {
      portfolio = await db.portfolios.getOrCreate();
    }

    return {
      user: JSON.parse(JSON.stringify(db.user)),
      portfolio,
    };
  } catch (err) {
    console.log(err);
    return { user: null, portfolio: null };
  }
};
