import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import { AppBar } from "../components/AppBar";
import { ContentContainer } from "../components/ContentContainer";
import Notifications from "../components/Notification";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({Component, pageProps}) => {
    return (
    <>
      <Head>
        <title>Solana Scaffold Lite</title>
      </Head>
      <ContextProvider>
        <div className="flex flex-col h-screen w-screen absolute top-0 left-0 z-1000">
          <Notifications />
          <AppBar />
          <ContentContainer>
              <div className='z-10'>
                  {/* @ts-ignore */}
                  <Component {...pageProps} />
              </div>
          </ContentContainer>
          {/* <Footer /> */}
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
