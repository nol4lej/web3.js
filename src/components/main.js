// import { connectNetwork, web3 } from "../controllers/1connection.js";

export function Main(){
    let connectionText = "○ Disconnected"
    let classValue;
    
    if(localStorage.getItem("ConnectionState")){
        // Recuperar el localStorage y convertirlo a objeto JS
        let connectionValue = JSON.parse(localStorage.getItem("ConnectionState"))
        connectionText = connectionValue.text;

        if(connectionValue.state === true){
            classValue = "active";
        }else{
            classValue = "";
        }
    }

    return `
        <section class="container blockchain">
            <div class="blockchain__connect">
                <span class="blockchain__current ${classValue}" id="current_blockchain">${connectionText}</span>
            </div>
            <div class="blockchain__data">
                <div class="input__data">
                    <h4>Lastest Block:</h4>
                    <span id="current_block"></span>
                </div>
                <div class="input__data">
                    <h4>Miner:</h4>  
                    <span id="block_miner"></span>
                    <button id="copy_miner" class="material-icons">content_copy</button>
                    <span id="copied_miner">Copied!</span>
                </div>
                <div class="input__data">
                    <h4>Hash:</h4>
                    <span id="hash_block"></span>
                    <button id="copy_hash" class="material-icons">content_copy</button>
                    <span id="copied_hash">Copied!</span>
                </div>
                <div class="input__data">
                    <h4>Gas used:</h4>
                    <span id="gas"></span>
                </div>
            </div>
            

        </section>
    `
}

    // const state = {
    //     connection: false
    // }
    
    // const template = () => {
    //     if(localStorage.getItem("ConnectionState") === "true"){
    //         current_blockchain.classList.add("active");
    //         return "● Connected Moonbase Alpha";
    //     } else {
    //         return "○ Disconnected";
    //     }
    // }
    
    // const render = () => {
    //     const current_blockchain = document.getElementById("current_blockchain");
    //     current_blockchain.textContent = template();
    //     console.log(state)
    // }
    
    // const setState = obj => {
    //     for(let key in obj){
    //         if(state.hasOwnProperty(key)){
    //             state[key] = obj[key]
    //         }
    //     }
    //     render()
    // }
    
    // const getState = () => {
    //     console.log( localStorage.getItem("ConnectionState"));
    // }
    // // getState()
    // setState({connection: getState})