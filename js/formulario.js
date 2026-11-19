class Formulario {
    constructor() {
        this.puntuacion = 0;

        this.correctas = {
            numeroEtapa: 5,
            fecha: "2026-08-26",
            salida: "palma del rio",
            llegada: "cordoba",
            tipo: "llana",
            hitos: ["sprint-intermedio"],
            dificultad: 3,
            longitud: 150,
            desnivel: 300
        };
        this.toleranciaDificultad = 1;
        this.toleranciaLongitud = 5;   
        this.toleranciaDesnivel = 50;  
    }

    analizar(event) {
        this.form = event.target;
        let form = this.form;

        this.numero_etapa = form.querySelector('#pregunta1')?.value || "";
        this.fecha        = form.querySelector('#pregunta2')?.value || "";
        this.salida       = form.querySelector('#pregunta3')?.value || "";
        this.llegada      = form.querySelector('#pregunta4')?.value || "";
        this.tipo         = form.querySelector('input[name="pregunta5"]:checked')?.value || "";

        this.hitos = Array.from(
            form.querySelectorAll('input[type="checkbox"]:checked')
        ).map(c => c.id);

        this.dureza      = form.querySelector('#pregunta6')?.value || "";
        this.longitud    = form.querySelector('#pregunta7')?.value || "";
        this.desnivel    = form.querySelector('#pregunta8')?.value || "";
        this.descripcion = form.querySelector('#pregunta9')?.value.trim() || "";
        this.nombre      = form.querySelector('#pregunta10')?.value.trim() || "";
    }

    #cercano(valor, esperado, tolerancia) {
        if (valor === "") return false;
        return Math.abs(Number(valor) - esperado) <= tolerancia;
    }

    #mismosHitos() {
        let esperados = this.correctas.hitos;
        return this.hitos.length === esperados.length &&
               esperados.every(h => this.hitos.includes(h));
    }

    #calcularPuntuacion() {
        let puntos = 0;

        if (Number(this.numero_etapa) === this.correctas.numeroEtapa) puntos++;
        if (this.fecha === this.correctas.fecha) puntos++;
        if (this.salida === this.correctas.salida) puntos++;
        if (this.llegada === this.correctas.llegada) puntos++;
        if (this.tipo === this.correctas.tipo) puntos++;
        if (this.#mismosHitos()) puntos++;
        if (this.#cercano(this.dureza, this.correctas.dificultad,
                          this.toleranciaDificultad)) puntos++;
        if (this.#cercano(this.longitud, this.correctas.longitud,
                          this.toleranciaLongitud)) puntos++;
        if (this.#cercano(this.desnivel, this.correctas.desnivel,
                          this.toleranciaDesnivel)) puntos++;

        this.puntuacion = puntos;
    }

    calificar() {
        this.#calcularPuntuacion();

        document.getElementById("calificacion")?.remove();

        let result = document.createElement("p");
        result.id = "calificacion";
        result.textContent =
            this.nombre + " has obtenido " + this.puntuacion +
            " puntos, la dureza que has asignado a la etapa es " + this.dureza +
            " y tu descripción " + this.descripcion;

        this.form.after(result);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementsByTagName("form")[0];
    let formulario = new Formulario();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formulario.analizar(e);
        formulario.calificar();
    });
});