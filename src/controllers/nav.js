const btn = document.getElementById("nav__button");
const menu = document.getElementById("menu__list");
const icon = document.getElementById("icon-nav-btn")

btn.addEventListener("click", () => {
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
    icon.textContent = (icon.textContent === "menu") ? "close" : "menu";
});

window.addEventListener("resize", () => {
    if(window.innerWidth >= 768){
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
        icon.textContent = "menu";
    };
});

// document.addEventListener("keydown", () => {
// })