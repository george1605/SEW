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
    
    async leerEquipo() {
        let response = await fetch("js/lavuelta.json");
        let data = await response.json();

        let equipos = data["equipos"];
        let filtered = equipos.find((equipo) => equipo["codigo_uci"] == this.codigo);
        this.alineacion = [];
        for(const ciclista of filtered["corredores"])
        {
            let objecto = new Ciclista(ciclista.nombre, ciclista.apellidos, ciclista.dorsal, ciclista.fecha_nacimiento, ciclista.nacionalidad);
            this.alineacion.push(objecto);
        }
    }

    alinearCiclistas() {
        return this.alineacion || [];
    }

    mostrarAlineacion() {
        if(this.alineacion == undefined || this.alineacion == null) return;

        let elemento = document.querySelector("main > section");
        for(const ciclista of this.alineacion)
        {
            let nombreCompleto = ciclista.getNombreCompleto();
            let dorsal = ciclista.getDorsal();
            let informacionAdicional = ciclista.getInformacionAdicional();

            let article = document.createElement("article");
            let image = document.createElement("img");
            image.src = "multimedia/ciclismo.png";

            let heading = document.createElement("h3");
            heading.innerText = ciclista.getNombreCompleto();

            let para = document.createElement("p");
            para.innerText = dorsal;

            let extra = document.createElement("p");
            extra.innerText = informacionAdicional;

            article.appendChild(heading);
            article.appendChild(image);
            article.appendChild(para);
            article.appendChild(extra);
            elemento.appendChild(article);
        }
    }
}

class Ciclista {
    constructor(nombre, apellido, dorsal, fecha, nacionalidad)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dorsal = dorsal;
        this.fecha = fecha;
        this.nacionalidad = nacionalidad;
    }

    getNombreCompleto() {
        return this.nombre + " - " + this.apellido;
    }

    getDorsal() {
        return this.dorsal;
    }

    getInformacionAdicional() {
        return this.fecha + ", " + this.nacionalidad;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const equipo = new Equipo("XDS ASTANA TEAM", "XAT", "Kazakhstan");
    equipo.rellenarAtributos();

    let main = document.querySelector("main");
    let section = document.createElement("section");
    section.setAttribute("id", "inserted-section");

    equipo.datosBasicos(section);
    section.insertAdjacentHTML("beforeend", equipo.getInformacionSecundaria());
    equipo.getPaginaWeb(section);

    await equipo.leerEquipo();
    equipo.mostrarAlineacion();
    main.insertBefore(section, main.children[1]);
});