import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { NextPage } from "next";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import { web3AuthInit } from "~~/auth/web3auth";
import { wrapper } from "~~/components/dash-wind/app/store";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import WatchPathname from "~~/components/web-3-crew/watchPathname";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ScaffoldEthApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  // Web3Auth
  useEffect(() => {
    const init = async () => {
      try {
        await web3AuthInit();
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const getLayout = Component.getLayout || (page => page);

  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <WagmiConfig config={wagmiConfig}>
      {/* <WatchPathname /> */}
      <NextNProgress />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={isDarkTheme ? darkTheme() : lightTheme()}
      >
        <Provider store={store}>
          <WatchPathname />
          <div className="flex flex-col min-h-screen">{getLayout(<Component {...props.pageProps} />)}</div>
          {/* <div className="flex flex-col min-h-screen">{getLayout(<Component {...pageProps} />)}</div> */}
        </Provider>
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
