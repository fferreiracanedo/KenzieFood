import { ApiPublica} from "./apiPublicaItens.js"

export class PesquisaDinamica {
    static arrayProdutos = []

     static filtroPesquisa(array, pesquisa) {
         console.log(array)
         if(pesquisa.length == 0 ) {
             console.log(array)
             ApiPublica.template(array)
         }
     
        array.forEach((produto) => {
           if(produto.nome == pesquisa) {
            this.arrayProdutos.push(produto)
           }
     }) 
     console.log(this.arrayProdutos)
     ApiPublica.template(this.arrayProdutos)
    this.arrayProdutos = []
}
}