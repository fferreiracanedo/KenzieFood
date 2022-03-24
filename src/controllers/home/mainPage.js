import { ApiPublica } from './apiPublicaItens.js'
import { Autenticador } from './verificadorLogin.js'
import { adminPage } from "../admin/cadastrarProduto.js"
import { botoesCategoria } from "../admin/cadastrarProduto.js"
import { PesquisaDinamica } from "./campoPesquisa.js"
<<<<<<< HEAD
=======
import {ButtoesPesquisa} from "./buttoesPesquisa.js"
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
import { UsuarioAutenticadoAPI } from './usuarioAunteticadoAPI.js'
import { LocalStorage } from '../localStorage.js'
import { Carrinho } from './adicionarCarrinho.js'
import { RemoverCarrinhar} from './removerCarrinho.js'
<<<<<<< HEAD

// AUTENTICACAO
Autenticador.autenticar()
const verificacao = Autenticador.usuarioAtual()

=======
// AUTENTICACAO
Autenticador.autenticar()
const verificacao = Autenticador.usuarioAtual()
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
if(verificacao == 'autenticado'){
    // RENDERIZAR CARRINHO
    const arrayProdutosCarrinho = await Carrinho.renderizarCarrinhoAutenticado()
    Carrinho.getProduto(arrayProdutosCarrinho)
    // DADOS DOS PRODUTOS
    const arrayProdutosAutenticado = await UsuarioAutenticadoAPI.produtos()
    // RENDERIZACAO PRODUTOS
    ApiPublica.template(arrayProdutosAutenticado)
<<<<<<< HEAD

    // RENDERIZACAO BOTOES CATEGORIAS
    adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")

=======
    // RENDERIZACAO BOTOES CATEGORIAS
    adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
    // FILTRO POR PESQUISA
    const campoPesquisa = document.querySelector("#pesquisa")
    campoPesquisa.addEventListener("keyup", (e)=> {
        const infoPesquisa =  e.target.value 
        PesquisaDinamica.filtroPesquisa(arrayProdutosAutenticado, infoPesquisa)
    })
<<<<<<< HEAD

=======
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
    // VALOR TOTAL CARRINHO
    const historicoCard = []
    const botoesAddCart = document.querySelectorAll('.adicionarNoCarrinho')
    botoesAddCart.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
<<<<<<< HEAD

=======
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
            const click = e.target
            const cardClick = click.closest('.cardProduto').id
            const produtoADD = {
                "product_id": `${cardClick}`
<<<<<<< HEAD
            }            
=======
            }
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
             const filtro = arrayProdutosAutenticado.find((produto) => produto.id == cardClick)
            // console.log()
            // if(!historicoCard.includes(filtro)){
            // }
            // historicoCard.push(filtro)
            Carrinho.adicionarCarrinhoDinamic(filtro)
<<<<<<< HEAD
            Carrinho.adicionarCarrinhoAutenticado(produtoADD)  
=======
            Carrinho.adicionarCarrinhoAutenticado(produtoADD)
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
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
<<<<<<< HEAD
            totalCarrinho.innerText = valorTotal 
        
        }) 
            
=======
            totalCarrinho.innerText = valorTotal
        })
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
        })
    const botoesRemover = document.querySelectorAll('.tirarCarrinho')
    botoesRemover.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id
            const cliqueCarrinho = cardClick.replace(/^./, "")
            const filtro = historicoCard.find((produto) => produto.id == cliqueCarrinho)
            console.log(cliqueCarrinho)
<<<<<<< HEAD
            
            RemoverCarrinhar.removerItemCarrinhoAutenticado(cliqueCarrinho)
            Carrinho.removerCarrinhoAutenticado(cardClick)

            }) 
=======
            RemoverCarrinhar.removerItemCarrinhoAutenticado(cliqueCarrinho)
            Carrinho.removerCarrinhoAutenticado(cardClick)
            })
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
        })
        const qtdCarrinho = document.getElementById('spanQtdCarrinho')
        const totalCarrinho = document.getElementById('spanValorCarrinho')
        const valores = document.querySelectorAll('.valorProdutoCarrinho')
<<<<<<< HEAD
        let valorTotal = 0
=======
         let valorTotal = 0
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
        let comprimento = []
        valores.forEach((valor) => {
            const valorAtual = Number(valor.innerText.slice(2))
            valorTotal   += valorAtual
            comprimento.push(valor)
        })
        qtdCarrinho.innerText = comprimento.length
<<<<<<< HEAD
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

=======
        totalCarrinho.innerText = valorTotal
    //RemoverCarrinhar.removerItemCarrinho(arrayProdutosCarrinho)
        setTimeout(() => {
            const botoesFiltro = document.querySelectorAll(".categoriasVitrine")
            botoesFiltro.forEach((botao)=>{
                botao.addEventListener("click", filtrarCategorias)
            })
        }, 500)
    let arrayProdutos = []
    function filtrarCategorias(event){
        const inputs = event.target
        arrayProdutosAutenticado.filter((produto)=>{
            if(produto.categoria == inputs.value){
                console.log(this)
                arrayProdutos.push(produto)
            }
        })
    ApiPublica.template(arrayProdutos)
    arrayProdutos = []
}
setTimeout(() => {
    const btnTodos = document.querySelector("#btnTodos")
    btnTodos.addEventListener("click", (e)=>{
        const clique = e.target.id
        if(clique == 'btnTodos'){
            ApiPublica.template(arrayProdutosAutenticado)
        }
    })
}, 500)

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
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
    // FILTRO POR PESQUISA
    const campoPesquisa = document.querySelector("#pesquisa")
    campoPesquisa.addEventListener("keyup", (e)=> {
        const infoPesquisa =  e.target.value 
        PesquisaDinamica.filtroPesquisa(arrayProdutos, infoPesquisa)
    })
<<<<<<< HEAD

=======
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
    // VALOR TOTAL CARRINHO
    const totalCarrinho = document.getElementById('spanValorCarrinho')
    let valorTotal = 0
    const valores = document.querySelectorAll('.valorProdutoCarrinho')
    valores.forEach((valor) => {
        const valorAtual = Number(valor.innerText.slice(2))
        valorTotal   += valorAtual
    })
<<<<<<< HEAD
    totalCarrinho.innerText = valorTotal 

=======
    totalCarrinho.innerText = valorTotal
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
    const botoesAddCart = document.querySelectorAll('.adicionarNoCarrinho')
    botoesAddCart.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id
<<<<<<< HEAD

            Carrinho.adicionarNoCarrinhoAnonimo(cardClick, arrayProdutos)
            
            const qtdCarrinho = document.getElementById('spanQtdCarrinho')
            qtdCarrinho.innerText = Carrinho.arrayCarrinho.length

=======
            Carrinho.adicionarNoCarrinhoAnonimo(cardClick, arrayProdutos)
            const qtdCarrinho = document.getElementById('spanQtdCarrinho')
            qtdCarrinho.innerText = Carrinho.arrayCarrinho.length
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
            const totalCarrinho = document.getElementById('spanValorCarrinho')
            let valorTotal = 0
            const valores = document.querySelectorAll('.valorProdutoCarrinho')
            valores.forEach((valor) => {
                const valorAtual = Number(valor.innerText.slice(2))
                valorTotal   += valorAtual
            })
<<<<<<< HEAD
            totalCarrinho.innerText = valorTotal 
            }) 

        })
    

=======
            totalCarrinho.innerText = valorTotal
            })
        })
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
        RemoverCarrinhar.removerItemCarrinhoAnonimo()
    // QUANTIDADE CARRINHO
    const qtdCarrinho = document.getElementById('spanQtdCarrinho')
    qtdCarrinho.innerText = Carrinho.arrayCarrinho.length
<<<<<<< HEAD


}

=======
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
}
const campoPesquisa = document.querySelector("#pesquisa")
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
// DESLOGAR
const botaoDeslogar = document.getElementById('sairDaConta')
botaoDeslogar.addEventListener('click', () => {
    LocalStorage.clearUserLocalStorage()
    Autenticador.autenticar()
<<<<<<< HEAD

})


// CARRINHO
// const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho")
// btnAdicionarCarrinho.addEventListener()
=======
})
const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho")
//btnAdicionarCarrinho.addEventListener()
// CARRINHO
// const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho")
// btnAdicionarCarrinho.addEventListener()
>>>>>>> 96c32f6b09051aa8d9c258e20e5222ae7776558d
