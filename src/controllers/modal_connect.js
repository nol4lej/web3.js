const connect_wallet = document.getElementById("connect_wallet");
const connect_modal = document.getElementById("connect_modal");
const close_modal = document.getElementById("close_modal");

connect_wallet.addEventListener("click", () => {
    connect_modal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

close_modal.addEventListener("click", closeModal);
export function closeModal(){
    connect_modal.style.display = "none";
    document.body.style.overflow = "auto";
}