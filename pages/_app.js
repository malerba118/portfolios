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
import { initGoodies } from "shared/utils";
import { DefaultSeo } from "next-seo";

const queryClient = new QueryClient();

initGoodies();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={pageProps.user}>
        <ChakraProvider
          theme={createTheme({ isAuthenticated: !!pageProps.user })}
        >
          <DefaultSeo
            title="Vernos - Portfolio Builder"
            description="Build a sleek, modern, portfolio site in seconds. Showcase your work without having to learn a complex website builder first."
            canonical="https://vernos.app/"
            openGraph={{
              url: "https://vernos.app/",
              title: "Vernos - Portfolio Builder",
              description:
                "Build a sleek, modern, portfolio site in seconds. Showcase your work without having to learn a complex website builder first.",
              images: [
                {
                  url:
                    "https://firebasestorage.googleapis.com/v0/b/vernos-prod.appspot.com/o/open-graph-seo-photo.png?alt=media&token=330fbede-2b1e-49ce-8a7b-5bc454914d3c",
                  width: 720,
                  height: 353,
                  alt: "Vernos Editor",
                  type: "image/png",
                },
              ],
              site_name: "Vernos",
            }}
            twitter={{
              handle: "@vernosapp",
              site: "@vernosapp",
              cardType: "summary_large_image",
            }}
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
