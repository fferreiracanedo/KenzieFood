import { ApiPublica } from './apiPublicaItens.js'
import { Autenticador } from './verificadorLogin.js'
import { adminPage } from "../admin/cadastrarProduto.js"
import { botoesCategoria } from "../admin/cadastrarProduto.js"
import { PesquisaDinamica } from "./campoPesquisa.js"
import { UsuarioAutenticadoAPI } from './usuarioAunteticadoAPI.js'
import { LocalStorage } from '../localStorage.js'
import { Carrinho } from './adicionarCarrinho.js'
import { RemoverCarrinhar} from './removerCarrinho.js'

// AUTENTICACAO
Autenticador.autenticar()
const verificacao = Autenticador.usuarioAtual()

if(verificacao == 'autenticado'){
    // RENDERIZAR CARRINHO
    const arrayProdutosCarrinho = await Carrinho.renderizarCarrinhoAutenticado()
    Carrinho.getProduto(arrayProdutosCarrinho)
    // DADOS DOS PRODUTOS
    const arrayProdutosAutenticado = await UsuarioAutenticadoAPI.produtos()
    // RENDERIZACAO PRODUTOS
    ApiPublica.template(arrayProdutosAutenticado)


    // RENDERIZACAO BOTOES CATEGORIAS
    adminPage.carregarCategorias("products", botoesCategoria, "Nav")
    adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")

    // FILTRO POR PESQUISA
    const campoPesquisa = document.querySelector("#pesquisa")
    campoPesquisa.addEventListener("keyup", (e)=> {
        const infoPesquisa =  e.target.value 
        PesquisaDinamica.filtroPesquisa(arrayProdutosAutenticado, infoPesquisa)
    })

    const botoesAddCart = document.querySelectorAll('.adicionarNoCarrinho')
    botoesAddCart.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id
            console.log(cardClick)
            const produtoADD = {
                "product_id": `${cardClick}`
            }            
            Carrinho.adicionarCarrinhoAutenticado(produtoADD)  
            Carrinho.getProduto(arrayProdutosCarrinho)
            RemoverCarrinhar.removerItemCarrinho(arrayProdutosCarrinho)
            }) 
            
        })
        
    RemoverCarrinhar.removerItemCarrinho(arrayProdutosCarrinho)

}
if(verificacao == 'anonimo'){
    // DADOS DOS PRODUTOS
    const arrayProdutos = await ApiPublica.buscarProdutosApi()
    Carrinho.startCarrinhoAnonimo(arrayProdutos)

    // RENDERIZACAO PRODUTOS
    ApiPublica.template(arrayProdutos)

    // RENDERIZACAO BOTOES CATEGORIAS
    adminPage.carregarCategorias("products", botoesCategoria, "Nav")

    // FILTRO POR PESQUISA
    const campoPesquisa = document.querySelector("#pesquisa")
    campoPesquisa.addEventListener("keyup", (e)=> {
        const infoPesquisa =  e.target.value 
        PesquisaDinamica.filtroPesquisa(arrayProdutos, infoPesquisa)
    })

    const botoesAddCart = document.querySelectorAll('.adicionarNoCarrinho')
    botoesAddCart.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id

            Carrinho.adicionarNoCarrinhoAnonimo(cardClick, arrayProdutos)
            
            const qtdCarrinho = document.getElementById('spanQtdCarrinho')
            qtdCarrinho.innerText = Carrinho.arrayCarrinho.length
            }) 

        })

        RemoverCarrinhar.removerItemCarrinhoAnonimo()
    // QUANTIDADE CARRINHO
    const qtdCarrinho = document.getElementById('spanQtdCarrinho')
    qtdCarrinho.innerText = Carrinho.arrayCarrinho.length
}

// DESLOGAR
const botaoDeslogar = document.getElementById('sairDaConta')
botaoDeslogar.addEventListener('click', () => {
    LocalStorage.clearUserLocalStorage()
    Autenticador.autenticar()

})


// CARRINHO
// const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho")
// btnAdicionarCarrinho.addEventListener()