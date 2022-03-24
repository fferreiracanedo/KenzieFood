import { CardProduto } from "./cardProdutos.js"

export class AdminAPI{
    static API_URL = 'https://kenzie-food-api.herokuapp.com/'

    static produtos(){
        const UserToken = localStorage.getItem('key').replaceAll(`"`, ``)

        fetch(`${this.API_URL}my/products`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${UserToken}`
            }
        })
        .then((response) => response.json())
        .then((request) => CardProduto.templateCard(request))
    
    }

}