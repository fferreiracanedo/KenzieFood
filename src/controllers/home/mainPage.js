import { ApiPublica } from './apiPublicaItens.js'
import { Autenticador } from './verificadorLogin.js'
import { adminPage } from "../admin/cadastrarProduto.js"
import { botoesCategoria } from "../admin/cadastrarProduto.js"
import { PesquisaDinamica } from "./campoPesquisa.js"
import {ButtoesPesquisa} from "./buttoesPesquisa.js"

Autenticador.autenticar()
const arrayProdutos = await ApiPublica.buscarProdutosApi()
ApiPublica.template(arrayProdutos)
adminPage.carregarCategorias("products", botoesCategoria, "Nav")

console.log(arrayProdutos)


const campoPesquisa = document.querySelector("#pesquisa")

campoPesquisa.addEventListener("keyup", (e)=> {
    const infoPesquisa =  e.target.value 
    console.log(infoPesquisa)
    PesquisaDinamica.filtroPesquisa(arrayProdutos, infoPesquisa)
})

//função que adiciona evento listen em todos os botoes da categoria 
//inicio



setTimeout(() => {
    const btnTodos = document.querySelector("#btnTodos")
    const inputCategorias = document.querySelectorAll(".categoriasVitrine")

    for(let i = 1; i <  inputCategorias.length ; i++){
        inputCategorias[i].addEventListener("click", ButtoesPesquisa.filtrarCategorias.bind(ButtoesPesquisa))
    }
    
    btnTodos.addEventListener("click", ButtoesPesquisa.filtrarTotal.bind(ButtoesPesquisa))

}, 500);
//fim 

const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho")

//btnAdicionarCarrinho.addEventListener()