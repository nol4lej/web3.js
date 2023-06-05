import { provider } from "./3connect_provider.js";

const add_chain_button = document.getElementById("add_chain")

const chainId = '0x507'; // Identificador de la cadena de bloques en hexadecimal
const rpcUrl = 'https://rpc.api.moonbase.moonbeam.network';
const chainName = 'Moonbase Alpha';
const symbol = 'DEV';
const blockExplorerUrl = 'https://moonbase.moonscan.io/';

function verifyChainHandler(){
  if(provider){
    add_chain_button.addEventListener("click", () => {
      provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId,
          chainName,
          rpcUrls: [rpcUrl],
          nativeCurrency: {
            name: chainName,
            symbol: symbol,
            decimals: 18,
          },
          blockExplorerUrls: [blockExplorerUrl],
        }],
      })
      .then(() => {
        console.log('Red agregada correctamente a la wallet.');
      })
      .catch((error) => {
        console.error('Error al agregar la red a la wallet:', error);
      });
    })
    
    // Evento para detectar si se a cambiado la chain.
    provider.on('chainChanged', handleChainChanged);
    // Funcion que se activa al cambiar de chain, si la chain es distinta a 0x507 aparece un mensaje
    async function handleChainChanged(){
      const currentChain = await provider.request({ method: 'eth_chainId'})
      if(currentChain !== "0x507"){
        console.log("Please connect to Moonbase")
      }
      console.log(currentChain)
    }
    handleChainChanged()
  }
}

verifyChainHandler()

export {verifyChainHandler}