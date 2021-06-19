import React, { useEffect } from "react";
import nookies from "nookies";
import * as auth from '../server/utils/auth'
import { useAuth } from 'client/useAuth'
import Database from 'server/services/database'
import Landing from 'shared/components/Landing'

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx)
    const db = await Database({ token: cookies.token })
    let portfolio = null
    if (db.auth.isAuthenticated()) {
      portfolio = await db.portfolios.getOrCreate()
    }

    return {
      props: {
        isAuthenticated: db.auth.isAuthenticated(),
        portfolio
      }
    }
  }
  catch(err) {
    console.log(err)
    return {
      props: { isAuthenticated: false,  portfolio: null },
    }
  }
};

const Home = (props) => {

  const user = useAuth()

  if (!props.isAuthenticated) {
    return <Landing />
  }

  return (
    <div>
      <h2>Hello, {user?.email}</h2>
      <p>{JSON.stringify(props.portfolio)}</p>
    </div>
  );
};

export default Home