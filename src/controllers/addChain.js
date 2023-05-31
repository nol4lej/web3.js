const add_chain = document.getElementById("add_chain")

const chainId = '0x507'; // Identificador de la cadena de bloques en hexadecimal
const rpcUrl = 'https://rpc.api.moonbase.moonbeam.network';
const chainName = 'Moonbase Alpha';
const symbol = 'DEV';
const blockExplorerUrl = 'https://moonbase.moonscan.io/';

function addChain(){
  window.ethereum.request({
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
}


export {addChain, add_chain}