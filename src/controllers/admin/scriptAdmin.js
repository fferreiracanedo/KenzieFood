import { LocalStorage }                 from "../localStorage.js";
import { AdminAPI }                     from "./adminAPI.js";
import { adminPage }                    from "./cadastrarProduto.js"

import { cadastrarProdutoModal }        from "./cadastrarProduto.js"
import { editarProdutoModal }           from "./cadastrarProduto.js"
import { botoesCategoria }              from "./cadastrarProduto.js"
import { cadastrarProdutoCategorias }   from "./cadastrarProduto.js"

// AUTENTICACAO
LocalStorage.getLocalStorageAutenticadorAdmin()

adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")

AdminAPI.produtos()


const adicionarProduto                  = document.getElementById("adicionarProduto")
const spanCadastrarProdutoModal         = document.getElementsByClassName("close")[0];
const spanEditarProdutoModal            = document.getElementsByClassName("close")[1];
const cadastrarProdutoForm              = document.getElementById("cadastrarProdutoForm");
const cadastrarProdutoButton            = document.getElementById("cadastrarProdutoButton")

cadastrarProdutoButton.                 addEventListener("click", (e)=>{
    e.preventDefault()
    adminPage.cadastrarNovoProduto()
})
adicionarProduto.                       addEventListener("click", (evt) => {
    evt.preventDefault()
    adminPage.abrirModal(cadastrarProdutoModal)
})

adicionarProduto.addEventListener("click", () => {
    cadastrarProdutoCategorias.innerHTML=""
    adminPage.carregarCategorias("my/products", cadastrarProdutoCategorias, "Cadastro")
    setTimeout(() => adminPage.habilitarSelecaoCategorias("Cadastro"), 1000)
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