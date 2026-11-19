class Buscador {

    constructor() {
        this.imagen = document.querySelector("search label img");
        this.input = document.querySelector("search input");

        this.imagen.addEventListener("click", this.buscar.bind(this));

        this.input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                this.buscar();
            }
        });
    }

    buscar() {
        this.limpiar_busqueda();

        const resultados = [];
        const texto_buscar = this.input.value.trim();

        if (texto_buscar !== "") {
            const texto_escapado = texto_buscar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const expresion = new RegExp(texto_escapado, "gi");
            const recorrido = document.createTreeWalker(
                document.querySelector("body"),
                NodeFilter.SHOW_TEXT
            );

            let nodo = recorrido.nextNode();

            while (nodo) {
                expresion.lastIndex = 0; 
                if (expresion.test(nodo.textContent)) {
                    resultados.push(nodo);
                }
                nodo = recorrido.nextNode();
            }

            resultados.forEach((node) => {
                const partes = node.textContent.split(new RegExp(`(${texto_escapado})`, "gi"));
                node.replaceWith(...partes.map((parte, indice) => {
                    if (indice % 2 === 0) return document.createTextNode(parte);
                    const marca = document.createElement("mark");
                    marca.textContent = parte;
                    return marca;
                }));
            });
        }
    }

    limpiar_busqueda() {
        document.querySelectorAll("mark").forEach((marca) => {
            marca.replaceWith(document.createTextNode(marca.textContent));
        });

        document.body.normalize();
    }
}

const buscador = new Buscador();