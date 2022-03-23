import { CardProduto } from "./cardProdutos.js"

export class AdminAPI{
    static UserToken = localStorage.getItem('key').replaceAll(`"`, ``)
    
    static API_URL = 'https://kenzie-food-api.herokuapp.com/'

    static produtos(){
        fetch(`${this.API_URL}my/products`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.UserToken}`
            }
        })
        .then((response) => response.json())
        .then((request) => CardProduto.templateCard(request))
    
    }

}