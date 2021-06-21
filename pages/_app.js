import { AuthProvider } from "client/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { isServer } from "shared/utils/ssr";
import { getSubdomain } from "shared/utils/url";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp(props) {
  if (props.subdomain === "127") {
    return <Box>Hiii</Box>;
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
  if (isServer()) {
    subdomain = getSubdomain(ctx.req.headers.host);
  } else {
    subdomain = getSubdomain(window.location.hostname);
  }
  return { subdomain };
};

export default MyApp;
