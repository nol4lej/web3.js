import {currentAccount, verificarCuentaFetch} from "./4accounts.js";

const wrapper = document.getElementById("wrapper"); // Obtén el elemento contenedor de la tabla

let previousSize = 0; // Variable para almacenar el tamaño anterior de los datos
let previousAccount;
export let intervalFetch; // solucionar el error de que se cargue doble la tabla al cambiar de cuenta y conectar.

export function fetchExplorer() {
    const fetchData = () => {
        fetch(`https://api-moonbase.moonscan.io/api?module=account&action=txlist&address=${currentAccount}&startblock=1&endblock=99999999&sort=asc&apikey=81QDSMYX7KWE3NS7S3H59Z88DEDTPJW4H4`)
            .then(data => { return data.json() })
            .then(data => {
                const resultado = data.result;
                console.log(resultado)
                if(verificarCuentaFetch === true){
                    if (resultado.length > previousSize || currentAccount !== previousAccount) {
                        console.log("yei")
                        datatable(resultado);
                        previousSize = resultado.length;
                        previousAccount = currentAccount;
                    };
                }

            })
            .catch(error => console.error("No se ha podido realizar la solicitud: " + error));
    };
    fetchData()
    intervalFetch = setInterval(fetchData, 5000); // Ejecutar el fetch cada 5 segundos después de la primera ejecución
}

function datatable(data) {
  wrapper.innerHTML = ""; // Limpiar el contenido del contenedor antes de renderizar la tabla

  const tableData = data.map((element, index) => {
    const number = index + 1;
    const txn = verifyStatus(element) + element.hash.slice(0,6)+"..."+element.hash.slice(-4);
    const age = element.timeStamp;
    const from = element.from.slice(0,6)+"..."+element.from.slice(-4);
    const to = handleAdressFromTo(element);
    const value = handleValue(element.value) + " DEV";
    const gas = ((element.gasUsed * element.gasPrice) / (10**18)).toFixed(8);

    return [number, txn, age, from, to, value, gas];
  }).reverse(); // Para mostrar desde la ultima transferencia.

  const mygrid = new gridjs.Grid({
    columns: ["N°",
            { 
                name: 'Txn',
                formatter: (cell) => gridjs.html(cell)
            },
            "Age",
            "From",
            { 
                name: 'To',
                formatter: (cell) => gridjs.html(cell)
            },
            "Value",
            "Gas Fee"
            ],
    search: true,
    pagination: {
        enabled: true,
        style: 'pagination', //
      },
    sort: true,
    data: tableData,
    style: {
        th: {
          'background-color': '#573d9038'
        },
        td: {
            'border-bottom' : '1px solid #e5e7eb'
        },
        footer: {
            'background-color': '#573d9038'
          }
      }
  }).render(wrapper);

    // wrapper.innerHTML = "";
    mygrid.updateConfig({
      // pagination: true,
      data: () => {
        return new Promise (resolve => {
            setTimeout(() => {
                resolve(tableData, 2000)
            })
        })
      }
    //   data: tableData,
    }).forceRender();
}

function handleAdressFromTo(element) {
    if (element.from === element.to){
        return `<span class="txnStatus"><span class="toSelf">SELF</span> ${element.to.slice(0,6)+"..."+element.to.slice(-4)}</span>`
    } else if(element.contractAddress){
        return `<span class="txnStatus"><span class="toOut">OUT</span> <a href="https://moonbase.moonscan.io/address/${element.contractAddress}" target="_blank">Contract Creation</a></span>` 
    } else if (element.from !== currentAccount){
        return `<span class="txnStatus"><span class="toIn">IN</span> ${element.to.slice(0,6)+"..."+element.to.slice(-4)}</span>`
    } else if(element.from !== element.to){
        return `<span class="txnStatus"><span class="toOut">OUT</span> ${element.to.slice(0,6)+"..."+element.to.slice(-4)}</span>`
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