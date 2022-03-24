import { LocalStorage }                 from "../localStorage.js";
import { AdminAPI }                     from "./adminAPI.js";
import { adminPage }                    from "./cadastrarProduto.js"

import { cadastrarProdutoModal }        from "./cadastrarProduto.js"
import { botoesCategoria }              from "./cadastrarProduto.js"
import { cadastrarProdutoCategorias }   from "./cadastrarProduto.js"
import { CardProduto } from "./cardProdutos.js";

// AUTENTICACAO
LocalStorage.getLocalStorageAutenticadorAdmin()


AdminAPI.produtos()
const arrProd = await AdminAPI.produtos()
console.log(arrProd)

setTimeout(() => {
    const botoesFiltro = document.querySelectorAll(".categoriasVitrine")
    botoesFiltro.forEach((botao)=>{
        botao.addEventListener("click", filtrarCategorias)
    })
}, 500)
let arrayProdutos = []
function filtrarCategorias(event){
const inputs = event.target
arrProd.filter((produto)=>{
    if(produto.categoria == inputs.value){
        console.log(this)
        arrayProdutos.push(produto)
    }
})

CardProduto.templateCard(arrayProdutos)
arrayProdutos = []
}
setTimeout(() => {
const btnTodos = document.querySelector("#btnTodos")
btnTodos.addEventListener("click", (e)=>{
const clique = e.target.id
if(clique == 'btnTodos'){
    CardProduto.templateCard(arrProd)
}
})
}, 500)

const adicionarProduto                  = document.getElementById("adicionarProduto")
const span                              = document.getElementsByClassName("close")[0];
const cadastrarProdutoForm              = document.getElementById("cadastrarProdutoForm");
const cadastrarProdutoButton            = document.getElementById("cadastrarProdutoButton")

cadastrarProdutoButton.addEventListener("click", (e)=>{
    e.preventDefault()
    adminPage.cadastrarNovoProduto()
})
adicionarProduto.                       addEventListener("click", adminPage.cadastrarProduto)

adicionarProduto.addEventListener("click", () => {
    cadastrarProdutoCategorias.innerHTML=""
    adminPage.carregarCategorias("my/products", cadastrarProdutoCategorias, "Cadastro")
    setTimeout(() => adminPage.habilitarSelecaoCategorias(), 700)
    setTimeout(() => adminPage.gerarCustomizarCategoria(), 700)
    setTimeout(() => {
        adminPage.categoriaInedita.addEventListener("keyup", () => {
            adminPage.categoriaCustomizada  = adminPage.categoriaInedita.value
            console.log(adminPage.categoriaCustomizada)
        })
    }, 700)
})
span.                                   addEventListener("click", adminPage.fecharModal)
window.                                 addEventListener("click", function(event) {
    if (event.target == cadastrarProdutoModal) {
        adminPage.fecharModal();
    }
})

adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")
