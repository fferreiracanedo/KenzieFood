export class UsuarioAutenticadoAPI{
    
    static API_URL = 'https://kenzie-food-api.herokuapp.com/'

    static arrayProdutos = {}


    static async produtos(){
        const UserToken = localStorage.getItem('key').replaceAll(`"`, ``)

        await fetch(`${this.API_URL}my/products`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${UserToken}`
            }
        })
        .then((response) => response.json())
        .then((request) => this.arrayProdutos.produtos = request)

        return this.arrayProdutos.produtos
    }
}