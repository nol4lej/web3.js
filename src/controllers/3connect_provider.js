import { connectWallet } from "./4accounts.js";
import { connecting } from "./1connections.js";

await connecting();

let provider;
  
function connectProvider(){
    const metamaskButton = document.getElementById("metamask_button");
    return new Promise((resolve, reject) => {
      metamaskButton.onclick = async () => {
        if(!window.ethereum){
            window.open("https://metamask.app.link/dapp/nol4lej.github.io/web3.js/")
            const MMSDK = new MetaMaskSDK.MetaMaskSDK();
            provider = MMSDK.getProvider();
            await connectWallet(provider);
            resolve()
        } else if(window.ethereum){
            provider = window.ethereum;
            await connectWallet(provider);
            resolve()
        } else {
            reject()
        }
      }
      // const trustWalletButton = document.getElementById("trust_wallet_button");
      // trustWalletButton.onclick = async () => {
      //     provider = getTrustWalletFromWindow();
      //     if (provider) {
      //         // window.open('trust://', '_blank')
      //         await connectWallet(provider);
      //         resolve()
      //     } else {
      //       try {
      //         window.open("https://link.trustwallet.com/open_url?url=https://nol4lej.github.io/web3.js/")
      //         resolve()
      //       } catch (error) {
      //         window.open('https://trustwallet.com/download', '_blank');
      //         console.log('Trust Wallet no detectado');
      //         reject()    
      //       }

              
      //     }
      // };
    })
};

// function getTrustWalletFromWindow() {
//     const isTrustWallet = (ethereum) => {
//       // Identifica si Trust Wallet está presente mediante su proveedor inyectado.
//       const trustWallet = !!ethereum.isTrust;
//       return trustWallet;
//     };
  
//     const injectedProviderExist =
//       typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  
//     if (!injectedProviderExist) {
//       return null;
//     }
  
//     if (isTrustWallet(window.ethereum)) {
//       return window.ethereum;
//     }
  
//     if (window.ethereum?.providers) {
//       return window.ethereum.providers.find(isTrustWallet) ?? null;
//     }
  
//     return window["trustwallet"] ?? null;
// };


export { provider, connectProvider };