// import { executeLastBlockAndEvent } from "./2blockchain_data.js";
import { Subject } from "../helpers/subject.js";

// Subclase que hereda métodos y propiedades de la clase base Subject
class ConnectionSubject extends Subject{
    constructor(){
        super();
        this.state = false;
        console.log(this.observers)
    }
    notify(state){
        this.state = state;
        super.notify(this);
        //Estoy llamando al metodo notify de la clase base (Subject) y pasando la instancia actual de ConnectionSubject como argumento.
        //Esto permite que todos los observadores suscritos a ConnectionSubject reciban la notificación y tengan acceso al estado actualizado a través de la propiedad state.
    }
}

class ConnectionObserver{
    notify(subject){
        console.log(subject.state)
    }
}

// Esta parte del código crea una instancia del sujeto (ConnectionSubject) y del observador (ConnectionObserver), 
// y luego suscribe el observador al sujeto utilizando el método subscribe. 
// De esta manera, el observador estará listo para recibir notificaciones y realizar acciones en función de los cambios de estado en el sujeto.
export const connectionSubject = new ConnectionSubject();
const observer = new ConnectionObserver();
connectionSubject.subscribe(observer)


export function connecting() {
    return new Promise((resolve, reject) => {
        web3 = new Web3("wss://moonbeam-alpha.api.onfinality.io/public-ws");

        // Verificar la conexion
        web3.eth.net.isListening()
        .then(() =>{
            console.log("Connected")
            connectionSubject.notify(true)
        })
        .catch(err => console.log(err.message))
    });
}

connecting()


// let web3; // scope global para posterior a darle valor poder exportar y reutilizar. 

// export async function connectNetwork(){
//     await connecting();
//     // executeLastBlockAndEvent();
// }

// function connecting(){
//     localStorage.removeItem('ConnectionState');
//     return new Promise((resolve, reject) => {
//         // web3 = new Web3("wss://moonasdasdasdasbeam-alpha.api.onfinality.io/public-ws");
//         web3 = new Web3("wss://moonbeam-alpha.api.onfinality.io/public-ws");
//         // Verifica si la conexión es válida
//         web3.eth.net.isListening()
//         .then(() => {
//             localStorage.setItem('ConnectionState', JSON.stringify({
//                 state: true,
//                 text: '● Connected Moonbase Alpha'
//             }));
//             // Renderiza por primera vez
//             const current_blockchain = document.getElementById("current_blockchain");
//             current_blockchain.classList.add("active");
//             current_blockchain.textContent = "● Connected Moonbase Alpha";
//             resolve();
//         })
//         .catch(error => {
//             localStorage.setItem('ConnectionState', JSON.stringify({
//                 state: false,
//                 text: '○ Disconnected'
//               }));
//             reject(error.message);
//         });
//     })
// }

// connectNetwork()

// export {web3, connecting};
// // Se exporta connecting para importar en 3accounts.js y esperar la promesa de connecting, si la promesa rechaza, no permite conectar la wallet.


