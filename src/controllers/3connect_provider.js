import { connectWallet } from "./4accounts.js";
import { connecting } from "./1connections.js";

await connecting();

var provider;
  
const options = {
  openDeeplink: "https://metamask.app.link/dapp/nol4lej.github.io/web3.js/",
}


function connectProvider(){
    const trustWalletButton = document.getElementById("trust_wallet_button");
    const metamaskButton = document.getElementById("metamask_button");

    return new Promise((resolve, reject) => {

        trustWalletButton.onclick = async () => {
            provider = getTrustWalletFromWindow();
            if (provider) {
                
                await connectWallet(provider);
                resolve()
            } else {
                // window.open('trust://', '_blank')
                window.open('https://trustwallet.com/download', '_blank');
                console.log('Trust Wallet no detectado');
                reject()    
                
            }
        };

        metamaskButton.onclick = async () => {
            if(!window.ethereum){
                const MMSDK = new MetaMaskSDK.MetaMaskSDK(options);
                provider = MMSDK.getProvider()
                await connectWallet(provider);
            } else if(window.ethereum){
                provider = window.ethereum;
                await connectWallet(provider);
                resolve()
            } else {
                reject()
            }
        }
    })
};

connectProvider();

function getTrustWalletFromWindow() {
    const isTrustWallet = (ethereum) => {
      // Identifica si Trust Wallet está presente mediante su proveedor inyectado.
      const trustWallet = !!ethereum.isTrust;
      return trustWallet;
    };
  
    const injectedProviderExist =
      typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  
    if (!injectedProviderExist) {
      return null;
    }
  
    if (isTrustWallet(window.ethereum)) {
      return window.ethereum;
    }
  
    if (window.ethereum?.providers) {
      return window.ethereum.providers.find(isTrustWallet) ?? null;
    }
  
    return window["trustwallet"] ?? null;
};




export { provider, connectProvider };