class Ciudad {
    constructor(nombre, pais, gentilicio) {
        this.nombre = nombre;
        this.pais = pais;
        this.gentilicio = gentilicio;
        this.poblacion = 0;
        this.coordenadas = { latitud: 0, longitud: 0, altitud: 0 };
    }

    rellenarAtributos() {
        this.poblacion = 21000; 
        this.coordenadas = {
            latitud: 37.7000,   
            longitud: -5.2833,
            altitud: 57
        };
    }

    getCiudad() {
        return String(this.nombre);
    }

    getPais() {
        return String(this.pais);
    }

    getInformacionSecundaria() {
        return "<ul>" +
                   "<li>Gentilicio: " + this.gentilicio + "</li>" +
                   "<li>Población: " + this.poblacion + " habitantes</li>" +
               "</ul>";
    }

    escribeCoordenadas(seccion = document.querySelector("section")) {
        const parrafo = document.createElement("p");
        parrafo.textContent = "Coordenadas: latitud " + this.coordenadas.latitud +
                              ", longitud " + this.coordenadas.longitud +
                              ", altitud " + this.coordenadas.altitud + " m";
        seccion.appendChild(parrafo);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ciudad = new Ciudad("Palma del Río", "España", "palmeño");
    ciudad.rellenarAtributos();

    const main = document.querySelector("main");
    const section = document.createElement("section");

    const nombreHeader = document.createElement("h3");
    nombreHeader.textContent = ciudad.getCiudad();
    section.appendChild(nombreHeader);

    const paisParrafo = document.createElement("p");
    paisParrafo.textContent = "País: " + ciudad.getPais();
    section.appendChild(paisParrafo);
    section.setAttribute("id", "inserted-section");

    section.insertAdjacentHTML("beforeend", ciudad.getInformacionSecundaria());

    main.appendChild(section);
    ciudad.escribeCoordenadas(section);
});