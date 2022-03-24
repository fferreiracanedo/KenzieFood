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
console.log('mainPAge')
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
    adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")

    // FILTRO POR PESQUISA
    const campoPesquisa = document.querySelector("#pesquisa")
    campoPesquisa.addEventListener("keyup", (e)=> {
        const infoPesquisa =  e.target.value 
        PesquisaDinamica.filtroPesquisa(arrayProdutosAutenticado, infoPesquisa)
    })

    // VALOR TOTAL CARRINHO
    const historicoCard = []
    const botoesAddCart = document.querySelectorAll('.adicionarNoCarrinho')
    botoesAddCart.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 

            const click = e.target
            const cardClick = click.closest('.cardProduto').id
            const produtoADD = {
                "product_id": `${cardClick}`
            }            
             const filtro = arrayProdutosAutenticado.find((produto) => produto.id == cardClick)
            // console.log()
            // if(!historicoCard.includes(filtro)){
            // }
            // historicoCard.push(filtro)
            Carrinho.adicionarCarrinhoDinamic(filtro)
            Carrinho.adicionarCarrinhoAutenticado(produtoADD)  
            //Carrinho.getProduto(arrayProdutosCarrinho)
            const valores = document.querySelectorAll('.valorProdutoCarrinho')
            const qtdCarrinho = document.getElementById('spanQtdCarrinho')
            const totalCarrinho = document.getElementById('spanValorCarrinho')
            let valorTotal = 0
            let comprimento = []
            valores.forEach((valor) => {
                const valorAtual = Number(valor.innerText.slice(2))
                valorTotal   += valorAtual
                comprimento.push(valor)
            })
            qtdCarrinho.innerText = comprimento.length
            totalCarrinho.innerText = valorTotal 
        
        }) 
            
        })
    const botoesRemover = document.querySelectorAll('.tirarCarrinho')
    botoesRemover.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id
            const cliqueCarrinho = cardClick.replace(/^./, "")
            const filtro = historicoCard.find((produto) => produto.id == cliqueCarrinho)
            console.log(cliqueCarrinho)
            
            RemoverCarrinhar.removerItemCarrinhoAutenticado(cliqueCarrinho)
            Carrinho.removerCarrinhoAutenticado(cardClick)

            }) 
        })
        const qtdCarrinho = document.getElementById('spanQtdCarrinho')
        const totalCarrinho = document.getElementById('spanValorCarrinho')
        const valores = document.querySelectorAll('.valorProdutoCarrinho')
        let valorTotal = 0
        let comprimento = []
        valores.forEach((valor) => {
            const valorAtual = Number(valor.innerText.slice(2))
            valorTotal   += valorAtual
            comprimento.push(valor)
        })
        qtdCarrinho.innerText = comprimento.length
        totalCarrinho.innerText = valorTotal 
        
    //RemoverCarrinhar.removerItemCarrinho(arrayProdutosCarrinho)

}
if(verificacao == 'anonimo'){
    //CADASTRO PROD
    const cadastrarProdutos = document.getElementById('cadastrarProdutos')
    cadastrarProdutos.style.display = 'none'
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

    // VALOR TOTAL CARRINHO
    const totalCarrinho = document.getElementById('spanValorCarrinho')
    let valorTotal = 0
    const valores = document.querySelectorAll('.valorProdutoCarrinho')
    valores.forEach((valor) => {
        const valorAtual = Number(valor.innerText.slice(2))
        valorTotal   += valorAtual
    })
    totalCarrinho.innerText = valorTotal 

    const botoesAddCart = document.querySelectorAll('.adicionarNoCarrinho')
    botoesAddCart.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id

            Carrinho.adicionarNoCarrinhoAnonimo(cardClick, arrayProdutos)
            
            const qtdCarrinho = document.getElementById('spanQtdCarrinho')
            qtdCarrinho.innerText = Carrinho.arrayCarrinho.length

            const totalCarrinho = document.getElementById('spanValorCarrinho')
            let valorTotal = 0
            const valores = document.querySelectorAll('.valorProdutoCarrinho')
            valores.forEach((valor) => {
                const valorAtual = Number(valor.innerText.slice(2))
                valorTotal   += valorAtual
            })
            totalCarrinho.innerText = valorTotal 
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