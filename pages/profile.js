import React, { useEffect } from "react";
import Toolbar from "shared/components/Toolbar";
import Layout from "shared/components/Layout";
import Profile from "shared/components/Profile";
import { getCommonSsrProps } from "server/utils/ssr";

export const getServerSideProps = async (ctx) => {
  let config = {};
  config.props = await getCommonSsrProps(ctx);
  if (!config.props.user) {
    config.redirect = {
      destination: "/login?from=/profile",
      permanent: false,
    };
  }
  return config;
};

const ProfilePage = (props) => {
  return <Layout fitWindow toolbar={<Toolbar />} content={<Profile />} />;
};

export default ProfilePage;
