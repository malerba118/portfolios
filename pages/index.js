import React, { useEffect } from "react";
import nookies from "nookies";
import * as auth from "../server/utils/auth";
import Database from "server/services/database";
import Landing from "shared/components/Landing";
import { Editor } from "shared/components";

export const getServerSideProps = async (ctx) => {
  console.log("please 2");
  try {
    const cookies = nookies.get(ctx);
    const db = await Database({ token: cookies.token });
    let portfolio = null;
    if (db.auth.isAuthenticated()) {
      portfolio = await db.portfolios.getOrCreate();
    }

    return {
      props: {
        isAuthenticated: db.auth.isAuthenticated(),
        portfolio,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { isAuthenticated: false, portfolio: null },
    };
  }
};

const Home = (props) => {
  if (!props.isAuthenticated) {
    return <Landing />;
  } else {
    return <Editor />;
  }
};

export default Home;
