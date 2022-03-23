import { ApiPublica } from './apiPublicaItens.js'
import { Autenticador } from './verificadorLogin.js'
import { adminPage } from "../admin/cadastrarProduto.js"
import { botoesCategoria } from "../admin/cadastrarProduto.js"
import { PesquisaDinamica } from "./campoPesquisa.js"


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

const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho")

btnAdicionarCarrinho.addEventListener()