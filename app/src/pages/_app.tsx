import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import { AppBar } from "../components/AppBar";
import { ContentContainer } from "../components/ContentContainer";
import { Footer } from "../components/Footer";
import Notifications from "../components/Notification";
import SplineObj from "components/SplineObj";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Solana Scaffold Lite</title>
      </Head>
      <div className="h-screen">
        <SplineObj scene={"./scene.splinecode"} />
      </div>
      <ContextProvider>
        <div className="flex flex-col h-screen w-screen absolute top-0 left-0 z-1000">
          <Notifications />
          <AppBar />
          <ContentContainer>
            <Component {...pageProps} />
          </ContentContainer>
          {/* <Footer /> */}
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
