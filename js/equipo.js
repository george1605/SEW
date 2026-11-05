class Equipo {
    constructor(nombre, codigo, pais) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.pais = pais;
    }

    getNombre() {
        return String(this.nombre);
    }

    getCodigo() {
        return String(this.codigo);
    }

    getPais() {
        return String(this.pais);
    }

    rellenarAtributos() {
        this.director = "Aleksandr Vinokúrov";
        this.categoria = "UCI WorldTeam";
        this.direccion = "https://www.lavuelta.es/en/team/XAT/xds-astana-team";
    }

    datosBasicos(seccion) {
        const titulo = document.createElement("h3");
        titulo.textContent = this.getNombre();
        seccion.appendChild(titulo);

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + this.getCodigo();
        seccion.appendChild(codigo);

        const pais = document.createElement("p");
        pais.textContent = "País: " + this.getPais();
        seccion.appendChild(pais);
    }

    getInformacionSecundaria() {
        return "<ul>" +
                   "<li>Director: " + this.director + "</li>" +
                   "<li>Categoría: " + this.categoria + "</li>" +
               "</ul>";
    }

    getPaginaWeb(seccion = document.querySelector("section")) {
        const parrafo = document.createElement("p");
        const enlace = document.createElement("a");
        enlace.setAttribute("href", this.direccion);
        enlace.textContent = "Página web oficial";
        parrafo.appendChild(enlace);
        seccion.appendChild(parrafo);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const equipo = new Equipo("XDS ASTANA TEAM", "XAT", "Kazakhstan");
    equipo.rellenarAtributos();

    let main = document.querySelector("main");
    let section = document.createElement("section");
    section.setAttribute("id", "inserted-section");

    equipo.datosBasicos(section);
    section.insertAdjacentHTML("beforeend", equipo.getInformacionSecundaria());
    equipo.getPaginaWeb(section);

    main.insertBefore(section, main.children[1]);
});