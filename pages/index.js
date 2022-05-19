import React, { useState } from "react";
import Landing from "shared/components/Landing2";
import Toolbar from "shared/components/Toolbar";
import Layout from "shared/components/Layout";
// import * as unauthed from "shared/components/unauthed";
// import { Editor } from "shared/components";
import { Center, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { getCommonSsrProps } from "server/utils/ssr";

const Editor = dynamic(() => import("shared/components/Editor"), {
  ssr: false,
});

export const getServerSideProps = async (ctx) => {
  return {
    props: await getCommonSsrProps(ctx),
  };
};

const Home = (props) => {
  const [isReady, setReady] = useState(false);
  if (!props.user) {
    return <Landing />;
  } else {
    return (
      <Layout
        fitWindow
        toolbar={<Toolbar />}
        content={
          <>
            <Editor onReady={() => setReady(true)} />
            {!isReady && (
              <Center h="100%" pos="absolute" w="100%" bg="white">
                <Spinner color="secondary.300" size="lg" />
              </Center>
            )}
          </>
        }
      />
    );
  }
};

export default Home;
