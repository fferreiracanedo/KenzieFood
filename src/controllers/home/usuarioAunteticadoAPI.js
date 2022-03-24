export class UsuarioAutenticadoAPI{
    static UserToken = localStorage.getItem('key').replaceAll(`"`, ``)
    
    static API_URL = 'https://kenzie-food-api.herokuapp.com/'

    static arrayProdutos = {}


    static async produtos(){
        await fetch(`${this.API_URL}my/products`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.UserToken}`
            }
        })
        .then((response) => response.json())
        .then((request) => this.arrayProdutos.produtos = request)

        return this.arrayProdutos.produtos
    }
}