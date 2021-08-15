import React, { useEffect } from "react";
import nookies from "nookies";
import * as auth from "../server/utils/auth";
import Database from "server/services/database";
import Landing from "shared/components/Landing";
import Toolbar from "shared/components/Toolbar";
import Layout from "shared/components/Layout";
// import { Editor } from "shared/components";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("shared/components/Editor"), {
  ssr: false,
});

export const getServerSideProps = async (ctx) => {
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
    return <Layout toolbar={<Toolbar />} content={<Landing />} />;
  } else {
    return <Layout fitWindow toolbar={<Toolbar />} content={<Editor />} />;
  }
};

export default Home;
