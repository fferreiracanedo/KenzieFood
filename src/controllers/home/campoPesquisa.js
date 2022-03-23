import { ApiPublica} from "./apiPublicaItens.js"

export class PesquisaDinamica {
    static arrayProdutos = []

     static filtroPesquisa(array, pesquisa) {
         
         if(pesquisa.length == 0 ) {
             ApiPublica.template(array)
         }
     
        array.filter(produto => {
            const filtroProduto = produto.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            const pesquisaFiltro = pesquisa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
           if(filtroProduto.includes(pesquisaFiltro)) {
            this.arrayProdutos.push(produto)
            console.log(pesquisa)
           }
     }) 
   
     ApiPublica.template(this.arrayProdutos)
    this.arrayProdutos = []
}
}

