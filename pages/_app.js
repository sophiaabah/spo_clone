import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <Component {...pageProps} />

    </ChakraProvider>
  );
}

export default MyApp;
