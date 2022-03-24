
import { LocalStorage }                 from "../localStorage.js";
import { AdminAPI }                     from "./adminAPI.js";
import { adminPage,cadastrarProdutoModal,editarProdutoModal,botoesCategoria,cadastrarProdutoCategorias } from "./cadastrarProduto.js"
console.log('scriptAdmin')

// AUTENTICACAO
LocalStorage.getLocalStorageAutenticadorAdmin()


AdminAPI.produtos()


const adicionarProduto                  = document.getElementById("adicionarProduto")
const spanCadastrarProdutoModal         = document.getElementsByClassName("close")[0];
const spanEditarProdutoModal            = document.getElementsByClassName("close")[1];
const cadastrarProdutoForm              = document.getElementById("cadastrarProdutoForm");
const cadastrarProdutoButton            = document.getElementById("cadastrarProdutoButton")
export const editarProdutoCategorias    = document.getElementById("editarProdutoCategorias");

cadastrarProdutoButton.addEventListener("click", (e)=>{
    e.preventDefault()
    adminPage.cadastrarNovoProduto()
})
adicionarProduto.addEventListener("click", (evt) => {
    evt.preventDefault()
    adminPage.abrirModal(cadastrarProdutoModal)
})

adicionarProduto.addEventListener("click", () => {
    cadastrarProdutoCategorias.innerHTML=""
    adminPage.carregarCategorias("my/products", cadastrarProdutoCategorias, "Cadastro")
    setTimeout(() => adminPage.habilitarSelecaoCategorias("Cadastro"), 800)
    setTimeout(() => adminPage.gerarCustomizarCategoria(), 100)
    setTimeout(() => {
        adminPage.categoriaInedita.addEventListener("keyup", () => {
            adminPage.categoriaCustomizada  = adminPage.categoriaInedita.value
        })
    }, 900)
})

spanCadastrarProdutoModal.addEventListener("click", (evt) => {
    evt.preventDefault()
    adminPage.fecharModal(cadastrarProdutoModal)
})

spanEditarProdutoModal.addEventListener("click", (evt) => {
    evt.preventDefault()
    adminPage.fecharModal(editarProdutoModal)
})

window.                                 addEventListener("click", function(event) {
    if (event.target == cadastrarProdutoModal) {
        adminPage.fecharModal(cadastrarProdutoModal);
    }
    if (event.target == editarProdutoModal) {
        adminPage.fecharModal(editarProdutoModal);
    }
})

adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")
