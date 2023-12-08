PayrollFactory deployed to: 0xfe44aB0B966E57F126130BE6401546c7351484ad --mumbai
TokenTransferor deployed to: 0x21d762ab159676d3bd05e12A95699C1d0b043A48 --mumbai
Payroll deployed to: 0xDBAbe75848c608bDA3382f0D68219542032B3fEa --mumbai
All deployed from 0x9768818565ED5968fAACC6F66ca02CBf2785dB84

https://api-testnet.polygonscan.com/IEWN9BX92EIKVXR22UKQQ9A4UWEF5J9IRG

There is no log out / wallet modal on Register Deploy
Need a rundown of how to log in with wallet and connect to mumbai chain without AA

I shouldnt need to change the web3auth client id correct?

deploy contract in register flow is stuck at getting account address...

## 12/7
Funkornaut@gmail -- 0xBB65877a1207572321dE0ad64A2e196545904a09
trevfost503@gmail -- 0xfd330177602f092b72a3b65893602067Ab69cE2c
sign in with funkornaut through gmail -- 0x1aD394b0c57dbC57f16A5A54b4ccee436b678287

deployed new payroll 0xAB34603b0A8c54f9F9Fe9207b98da8ac354dB68e
- added function isOwner returns bool, owner() func on ownable works but since we then needed to look for bool on front end thought that would simplify from end logic / routing
- think that the LogIn flow is a little better

Login.tsx
Web3 modal pops up when you hit login button - should only pop up if there is a contract address in the form

Now logOut if funky
Cant log in with Metamask

DeployForm
- just using useContractWrite was able to click button and make action got this error in browser console
    next-dev.js:20 ConnectorNotFoundError: Connector not found at writeContract (chunk-TSH6VVF4.js:2348:1)

