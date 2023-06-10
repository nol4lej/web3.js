import {currentAccount} from "./4accounts.js";

const table_body = document.getElementById("table_body");

export function fetchExplorer() {
    const fetchData = () => {
      fetch(`https://api-moonbase.moonscan.io/api?module=account&action=txlist&address=${currentAccount}&startblock=1&endblock=99999999&sort=asc&apikey=81QDSMYX7KWE3NS7S3H59Z88DEDTPJW4H4`)
        .then(data => { return data.json() })
        .then(data => {
          clearTable()
          handleNormalTransactions(data)
        })
        .catch(error => console.error("No se ha podido realizar la solicitud: " + error));
    };
  
    fetchData(); // Ejecutar el fetch inmediatamente al llamar a la función
  
    setInterval(fetchData, 5000); // Ejecutar el fetch cada 5 segundos después de la primera ejecución
  }

function clearTable() {
    while (table_body.firstChild) {
      table_body.firstChild.remove();
    }
}

function handleNormalTransactions(data){
    table_body.style.display = "table-row-group"
    const transactions = data.result;
    // se invierte el array para traer primero las ultimas transacciones.
    transactions.reverse().forEach((element, index) => {
        const fila = document.createElement("tr");
        const number = document.createElement("td");
        const txn = document.createElement("td");
        const age = document.createElement("td");
        const from = document.createElement("td");
        const to = document.createElement("td");
        const value = document.createElement("td");
        const gas = document.createElement("td");

        to.setAttribute("class", "transactionTo");
        txn.setAttribute("class", "transactionTxn")
        
        number.textContent = transactions.length - index;
        txn.innerHTML = verifyStatus(element) + element.hash.slice(0,6)+"..."+element.hash.slice(-4);
        age.textContent = element.timeStamp //convertTimestamp(element.timeStamp);
        from.textContent = element.from.slice(0,6)+"..."+element.from.slice(-4);
        to.innerHTML = handleAdressFromTo(element);
        value.textContent = handleValue(element.value) + " DEV";
        gas.textContent = ((element.gasUsed * element.gasPrice) / (10**18)).toFixed(8);

        fila.append(number, txn, age, from, to, value, gas);
        table_body.append(fila);
    });
}

// function convertTimestamp(timestamp){
//     const date = new Date(timestamp * 1000); // Multiplica por 1000 para convertir a milisegundos

//     const dia = date.toLocaleDateString(); // Obtener la fecha en formato legible
//     const hora = date.toLocaleTimeString(); // Obtener la hora en formato legible

//     console.log("Fecha:", dia);
//     console.log("Hora:", hora);

//     return ("Fecha:", dia + "Hora:", hora)

// }

function handleAdressFromTo(element) {
    if (element.from === element.to){
        return `<span class="toSelf">SELF</span> ${element.to.slice(0,6)+"..."+element.to.slice(-4)}`
    } else if(element.contractAddress){
        return `<span class="toOut">OUT</span> <a href="https://moonbase.moonscan.io/address/${element.contractAddress}" target="_blank">Contract Creation</a>` 
    } else if (element.from !== currentAccount){
        return `<span class="toIn">IN</span> ${element.to.slice(0,6)+"..."+element.to.slice(-4)}`
    } else if(element.from !== element.to){
        return `<span class="toOut">OUT</span> ${element.to.slice(0,6)+"..."+element.to.slice(-4)}`
    } 
}

function handleValue(element){
    const resultado = (parseFloat(element) / 10**18).toFixed(15);
    if(resultado >= "1"){
        return parseFloat(resultado.toString());
    } else if(element === "0"){
        return element;
    } else {
        return resultado;
    }
}

function verifyStatus(element){
    if(element.txreceipt_status === "0"){
        return `<i class="material-icons">error</i>`;
    } else{
        return "";
    }
}

// OTRA MANERA DE REALIZAR LA FUNCION PRINCIPAL:

// function handleNormalTransactions(data){
//     const transactions = data.result;
//     const filas = transactions.reverse().map((element, index) => {
//         const number = transactions.length - index;
//         const txn = verifyStatus(element) + element.hash.slice(0,6)+"..."+element.hash.slice(-4);
//         const age = element.timeStamp;
//         const from = element.from.slice(0,6)+"..."+element.from.slice(-4);
//         const to = handleAdressFromTo(element);
//         const value = handleValue(element.value) + " DEV";
//         const gas = ((element.gasUsed * element.gasPrice) / (10**18)).toFixed(8);
    
//         return `<tr>
//                     <td>${number}</td>
//                     <td class="transactionTxn">${txn}</td>
//                     <td>${age}</td>
//                     <td>${from}</td>
//                     <td class="transactionTo">${to}</td>
//                     <td>${value}</td>
//                     <td>${gas}</td>
//                 </tr>`;
//     });
    
//     table_body.innerHTML = filas.join('');
// }