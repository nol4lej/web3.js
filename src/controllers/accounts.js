// const fs = require('fs');

class User{
    constructor(id, wallet){
        this.id = id;
        this.wallet = wallet;
    }

    addUser(id, wallet){
        const nuevo = new User(id, wallet);
        const nuevoJSON = JSON.stringify(nuevo, null, 2);
        console.log(nuevoJSON)
    }
}

export async function connectWallet(){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account);

    fetch('../../users.json')
    .then(data => data.json())
    .then(respuesta => {
        controllerUsers(respuesta, account);
    })
}

async function controllerUsers(respuesta, account){
    await verifyAccount(respuesta, account);
    const new_user = new User();
    new_user.addUser(respuesta.length + 1, account)
}

function verifyAccount(array, account){
    return new Promise((resolve, reject) => {
        array.forEach(user => {
            if(user.wallet === account){
                console.log("Wallet ya existe: ", account)
                reject()
            }
        });
        resolve()
    })

}