import { Main } from "../components/main.js";

const root = document.getElementById("root")

const router = (route) => {
    root.innerHTML = "";
    switch (route) {
        case "#/":
        case "":
            root.innerHTML = Main();
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