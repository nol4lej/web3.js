import { connectionSubject } from "../controllers/1connection.js"
import { blockchainSubject } from "../controllers/2blockchain_data.js";

let connState = "○ Desconnected";
let renderStyle = "";
let lastestBlock = "";
let miner = "";
let hash = "";
let gasUsed = "";

class ConnectionObserverMain{
    // subject es el sujeto suscrito (connectionSubject)
    notify(subject){
        const state = this.getState(subject);
        if(state){
            connState = "● Connected";
            renderStyle = "active";
        }
        updateTemplate();
    }

    getState(subject){
        return subject.state;
    };
};
// connectionSubject es un sujeto observable que emite notificaciones,
// connectionObserver es un observador que se suscribe a ese sujeto.
const connectionObserver = new ConnectionObserverMain();
connectionSubject.subscribe(connectionObserver);

function updateTemplate() {
    const currentBlockchainElement = document.getElementById("current_blockchain");
    if (currentBlockchainElement) {
        currentBlockchainElement.textContent = connState;
        const state = connectionObserver.getState(connectionSubject);
        if(state){
            currentBlockchainElement.classList.add(renderStyle);
        } else {
            currentBlockchainElement.classList.remove(renderStyle);
        };
    };
};


class BlockchainObserverMain{
    notify(subject){
        const data = subject.data
        lastestBlock = data.lastestBlock;
        miner = data.miner
        hash = data.hash;
        gasUsed = data.gasUsed;
        updateData(data);
    };
};

const blockchainObserverMain = new BlockchainObserverMain();
blockchainSubject.subscribe(blockchainObserverMain);

function updateData(data){{
    const dataArray = Object.entries(data)
    const blockchain__data = document.getElementById("blockchain__data")
    if(blockchain__data){
        const pElements = blockchain__data.querySelectorAll("p")
        // recorro el array con los elementos "p"
        pElements.forEach(element => {
            // por cada elemento "p", busco en el dataArray si el elemento "p" tiene el mismo id que uno de los elementos de dataArray
            dataArray.find(e => {
                // e[0] es porque cada elemento de dataArray contiene 2 elementos (nombre, dato). Ej: ['hash', '0x0000']
                if(e[0] === element.id){
                    // console.log(`${e[0]} es igual al ID de ${element.id}`)
                    element.textContent = e[1]
                }
            })
        });
    }

}};

export function Main(){
    return `
        <section class="container blockchain">
            <div class="blockchain__connect">
                <span class="blockchain__current ${renderStyle}" id="current_blockchain">${connState}</span>
            </div>
            <div class="blockchain__data" id="blockchain__data">
                <div class="input__data">
                    <h4>Lastest Block:</h4>
                    <p id="lastestBlock">${lastestBlock}</p>
                </div>
                <div class="input__data">
                    <h4>Miner:</h4>  
                    <p id="miner">${miner}</p>
                    <button id="copy_miner" class="material-icons">content_copy</button>
                    <span id="copied_miner">Copied!</span>
                </div>
                <div class="input__data">
                    <h4>Hash:</h4>
                    <p id="hash">${hash}</p>
                    <button id="copy_hash" class="material-icons">content_copy</button>
                    <span id="copied_hash">Copied!</span>
                </div>
                <div class="input__data">
                    <h4>Gas used:</h4>
                    <p id="gasUsed">${gasUsed}</p>
                </div>
            </div>
        </section>
    `
}