import { ChakraProvider } from "@chakra-ui/react";
import Player from "../components/player";
import React from "react";
import Layout from "../components/layout";

// function MyApp({ Component, pageProps }) {
//   return (
//     <ChakraProvider>
//       <Component {...pageProps} />
//       {/* <Stack></Stack> */}
//       <Player />
//     </ChakraProvider>
//   );
// }

// export default MyApp;

export default function MyApp({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = [`/`].includes(appProps.router.pathname);

  const LayoutComponent = isLayoutNeeded ? React.Fragment : Player;

  return (
    <ChakraProvider>
      <>
        <Component {...pageProps} />
        <LayoutComponent />
      </>
    </ChakraProvider>
  );
}
