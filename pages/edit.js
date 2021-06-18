import React, { useEffect } from "react";
import nookies from "nookies";
import * as auth from '../server/utils/auth'
import { useAuth } from 'client/useAuth'
import Database from 'server/services/database'
import { UnauthenticatedError } from 'server/services/database/errors'

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx)
    if (!cookies.token) {
      throw new UnauthenticatedError()
    }
    // const db = await Database({ token: cookies.token })
    const db = await Database({ token: cookies.token })
    return {
      props: {}
    }
  }
  catch(err) {
    return {
      props: {},
      redirect:  {
        permanent: false,
        destination: `/login?from=${ctx.resolvedUrl}`,
      }
    }
  }

};

const Edit = (props) => {

  return (
    <div>
      edit
    </div>
  );
};

export default Edit