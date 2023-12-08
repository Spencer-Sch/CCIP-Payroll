// import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";

//import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";

// import { createWalletClient, custom } from "viem";
// import { polygonMumbai } from "viem/chains";
// import { AuthProvider, setAuthProvider, setIsConnected } from "~~/auth/authSlice";
// import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";

// set up your web3auth instance with all the features you want
// const web3AuthInstance = new Web3Auth({
//   clientId: "BM0SLNkhMCfIygw0Xi79dG6qbWGMN0o0mEeDjRT0dxlP3BEok9pnu5aqxCNfj2TZ9XT7sQaXm0ltuWbCQ1tsRNI",
//   chainConfig: {
//     chainNamespace: "eip155",
//     chainId: "0x13881", // Mumbai
//     rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
//     displayName: "Mumbai Testnet",
//     blockExplorer: "https://mumbai.polygonscan.com/",
//     ticker: "MATIC",
//     tickerName: "Polygon",
//   },
//   web3AuthNetwork: "sapphire_mainnet",
// });

export const web3auth = new Web3Auth({
  clientId: "BM0SLNkhMCfIygw0Xi79dG6qbWGMN0o0mEeDjRT0dxlP3BEok9pnu5aqxCNfj2TZ9XT7sQaXm0ltuWbCQ1tsRNI", // Get your Client ID from the Web3Auth Dashboard
  web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x13881", // Mumbai
    rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
    displayName: "Mumbai Testnet",
    blockExplorer: "https://mumbai.polygonscan.com/",
    ticker: "MATIC",
    tickerName: "Polygon",
  },
});

export async function web3AuthInit() {
  try {
    await web3auth.initModal();
  } catch (error) {
    console.error(error);
  }
}

// Failed attempt at making a custom hook
// Saving for future reference / another try
// export function useWeb3auth() {
//   const [provider, setProvider] = useState<AuthProvider>(null);
//   const [loggedIn, setLoggedIn] = useState(false);

//   // useEffect(() => {
//   //   console.log(`web3auth useEffect - provider: ${!!provider} | loggedIn: ${isConnected}`);
//   // }, [provider, isConnected]);
//   // useEffect(() => {
//   //   console.log(`web3auth useEffect - provider: ${!!provider} | loggedIn: ${loggedIn}`);
//   // }, [provider, loggedIn]);

//   // async function web3AuthInit() {
//   //   console.log("web3Auth Init...");
//   //   try {
//   //     await web3auth.initModal();
//   //     console.log("web3AuthProvider - from init: ", web3auth.provider);
//   //     setProvider(web3auth.provider);

//   //     if (web3auth.connected) {
//   //       console.log("web3Auth Init connected?: ", web3auth.connected);
//   //       dispatch(setIsConnected({ isConnected: true }));
//   //       // setLoggedIn(true);
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }

//   async function loginW3A() {
//     try {
//       const web3authProvider = await web3auth.connect();
//       // dispatch(setAuthProvider({ provider: web3authProvider }));
//       console.log("web3AuthProvider - from loginW3A: ", web3authProvider);
//       setProvider(web3authProvider);
//       if (web3auth.connected) {
//         dispatch(setIsConnected({ isConnected: true }));
//         console.log("web3Auth - loggedIn: ", loggedIn);
//         setLoggedIn(true);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function logoutW3A() {
//     await web3auth.logout();
//     setProvider(null);
//     setLoggedIn(false);
//     console.log("logged out");
//   }

//   async function getAccountsW3A() {
//     if (!provider) {
//       // uiConsole("provider not initialized yet");
//       console.log("from getAccountsW3A: provider not defined");
//       return;
//     }
//     const client = createWalletClient({
//       chain: polygonMumbai,
//       transport: custom(provider),
//     });

//     // Get user's Ethereum public address
//     const [address] = await client.getAddresses();
//     // toast message?
//     return address;
//   }

//   return { provider, loggedIn, web3AuthInit, loginW3A, logoutW3A, getAccountsW3A };
// }
