import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { createConfig } from "wagmi";
import { web3auth as web3AuthInstance } from "~~/auth/web3auth";
import { appChains, wagmiConnectors } from "~~/services/web3/wagmiConnectors";

export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    ...wagmiConnectors(),
    new Web3AuthConnector({
      chains: appChains.chains,
      options: {
        web3AuthInstance,
      },
    }),
  ],
  publicClient: appChains.publicClient,
});
