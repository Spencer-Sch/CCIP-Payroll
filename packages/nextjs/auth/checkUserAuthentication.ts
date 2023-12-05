// import { web3auth } from "~~/auth/web3auth";

export default function checkUserAuthentication(path: string, isConnected: boolean) {
  // export default function checkUserAuthentication(path: string) {
  // console.log("from checkUserAuthentication - Path = ", path);

  const protectedRoutes = [
    "/dapp/dashboard",
    "/dapp/welcome",
    "/dapp/leads",
    "/dapp/settings-team",
    "/dapp/calendar",
    "/dapp/transactions",
    "/dapp/settings-profile",
    "/dapp/settings-billing",
    "/dapp/charts",
    "/dapp/integration",
  ];

  // if (!web3auth.connected && protectedRoutes.includes(path)) {
  if (!isConnected && protectedRoutes.includes(path)) {
    return false;
  }
  return true;
}
