class Carrusel {
    constructor() {
        this.actual = 0;
        this.maximo = 4;
        this.busqueda = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
        this.json = {};
        this.links = [];
    }

    async getFotografias() {
        let link = this.busqueda;
        this.json = await $.getJSON(this.busqueda, 
                    {
                        tags: "la vuelta",
                        tagmode: "any",
                        format: "json"
                    });
    }

    procesarJSONFotografias() {
        let items = this.json["items"];
        this.links = [];

        for(var i = 0;i < 5;i++)
        {
            let link = items[i].media.m;
            this.links.push(link.replace('_m', '_z'));
        }
    }

    mostrarFotografias() {
        for(var i = 0;i < 5;i++)
        {
            $("<img/>").attr("src", this.links[i]).appendTo("#carrusel");
        }
    }

    cambiarFotografia() {
        $("#carrusel-fotografia").attr("src", this.links[this.actual]);
        setInterval(() => {
            // cambia
            this.actual = (this.actual + 1) % (this.maximo + 1);
            $("#carrusel-fotografia").attr("src", this.links[this.actual]);
        }, 3000);
    }
}

let carrusel = new Carrusel();
document.addEventListener('DOMContentLoaded', async () => {
    await carrusel.getFotografias();
    carrusel.procesarJSONFotografias();
    console.log(carrusel.links);

    // carrusel.mostrarFotografias();
    carrusel.cambiarFotografia();
})