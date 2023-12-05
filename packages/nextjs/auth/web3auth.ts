import { Web3Auth } from "@web3auth/modal";

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
