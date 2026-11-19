class Menu {
    constructor(boton, menu) {
        this.boton = boton;
        this.menu = menu;
        this.boton.addEventListener("click", this.desplegar.bind(this));
    }

    desplegar() {
        const abierto = this.menu.classList.toggle("abierto");
        this.boton.textContent = abierto ? "x" : "☰";
        this.boton.setAttribute("aria-expanded", String(abierto));
    }
}

const menu = new Menu(
    document.querySelector("header > button"),
    document.querySelector("header > nav")
);