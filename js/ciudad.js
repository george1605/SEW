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

    getMeteorlogia() {
        this.apikey = 'fbdb80b264168ad596d1f319e173b7a3';
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.nombre + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;

        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function (datos) {
                var temperatura = $('temperature', datos).attr("value");
                var temperaturaMin = $('temperature', datos).attr("min");
                var temperaturaMax = $('temperature', datos).attr("max");
                var temperaturaUnit = $('temperature', datos).attr("unit");
                var humedad = $('humidity', datos).attr("value");

                var stringDatos = "<ul><li>Número de elementos del XML: " + totalNodos + "</li>";
                stringDatos += "<li>Temperatura: " + temperatura + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mínima: " + temperaturaMin + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
                stringDatos += "<li>Temperatura (unidades): " + temperaturaUnit + "</li>";
                stringDatos += "<li>Humedad: " + humedad + "</li>"; 

                $("p").html(stringDatos).appendTo("#meteorologia");
            }
        })
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

    ciudad.escribeCoordenadas(section);
    ciudad.getMeteorlogia();
    main.appendChild(section);
});