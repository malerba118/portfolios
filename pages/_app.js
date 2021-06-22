import { AuthProvider } from "client/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { isServer } from "shared/utils/ssr";
import { getSubdomain } from "shared/utils/url";
import axios from "axios";
import nookies from "nookies";
import * as templates from "shared/components/templates";
// import Database from "server/services/database";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp(props) {
  const template = {
    name: "venice",
    version: "v1",
  };
  const Template = templates[template.name][template.version];
  if (props.subdomain === "127.0") {
    return <Template portfolio={props.portfolio} />;
  }
  const { Component, pageProps } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  let subdomain;
  let portfolio;
  if (isServer()) {
    // const cookies = nookies.get(ctx);
    // const db = await Database({ token: cookies.token });
    subdomain = getSubdomain(ctx.req.headers.host);
    // if (subdomain) {
    //   portfolio = db
    // }
  } else {
    subdomain = getSubdomain(window.location.hostname);
  }
  return { subdomain, portfolio };
};

export default MyApp;
