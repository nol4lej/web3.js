const main = document.getElementById("main")

const router = (route) => {
    main.innerHTML = "";
    switch (route) {
        case "#/":
        case "":
            main.innerHTML = "estoy en main"
            break;
        case "#/transactions":
            console.log("estoy en transactions")
            break;
        case "#/signs":
            console.log("estoy en signs")
            break;

        default:
            console.log("error 404")
            break;
    }
}

export { router }