import { AuthProvider } from "client/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { createTheme } from "shared/utils/theme";
import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/600.css";
import "@fontsource/karla/400.css";
import "../styles/globals.css";
import "../shared/components/Datepicker.css";
import "../shared/components/FontSelector.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={pageProps.user}>
        <ChakraProvider
          theme={createTheme({ isAuthenticated: !!pageProps.user })}
        >
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
