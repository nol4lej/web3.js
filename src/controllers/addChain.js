const add_chain = document.getElementById("add_chain")

const chainId = '0x507'; // Identificador de la cadena de bloques (por ejemplo, '0x1' para Ethereum Mainnet)
const rpcUrl = 'https://rpc.api.moonbase.moonbeam.network'; // URL del proveedor RPC de la red que deseas agregar
const chainName = 'Moonbase Alpha'; // Nombre descriptivo de la red que deseas agregar
const symbol = 'DEV'; // Símbolo de la moneda de la red que deseas agregar
const blockExplorerUrl = 'https://moonbase.moonscan.io/'; // URL del explorador de bloques de la red que deseas agregar

function addChain(){
    ethereum.request({
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