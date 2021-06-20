import { AuthProvider } from "client/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import '../styles/globals.css'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
