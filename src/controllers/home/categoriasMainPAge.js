export class APIcategorias{
    static API_URL          = 'https://kenzie-food-api.herokuapp.com/'
    static tokenDaEquipe    = localStorage.getItem('key').replaceAll(`"`, ``)

    static async categoriasAutenticado(){
        let arrayCategorias = []

        await fetch(`${this.API_URL}my/products`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.tokenDaEquipe}`
            },
        })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((produto) => {
                arrayCategorias.push(produto.categoria.split(',').join(' '))
            })
        })

        return arrayCategorias
    }

    static async categoriasAnonimo(){
        let arrayCategorias = []
        await fetch(`${this.API_URL}products`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((produto) => {
                arrayCategorias.push(produto.categoria)
            })
        })

        return arrayCategorias
    }
}