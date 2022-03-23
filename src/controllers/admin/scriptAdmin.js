
import { LocalStorage } from "../localStorage.js";
import { AdminAPI } from "./adminAPI.js";
import { adminPage }                    from "./cadastrarProduto.js"

import { cadastrarProdutoModal }        from "./cadastrarProduto.js"
import { botoesCategoria }              from "./cadastrarProduto.js"
import { cadastrarProdutoCategorias }   from "./cadastrarProduto.js"
import { categoriaInedita }             from "./cadastrarProduto.js"


LocalStorage.getLocalStorageAutenticadorAdmin()
adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")
adminPage.carregarCategorias("products", cadastrarProdutoCategorias, "Cadastro")
setTimeout(() => adminPage.habilitarSelecaoCategorias(), 2000)

AdminAPI.produtos()


const adicionarProduto                  = document.getElementById("adicionarProduto")
const span                              = document.getElementsByClassName("close")[0];
const cadastrarProdutoForm              = document.getElementById("cadastrarProdutoForm");
const cadastrarProdutoButton            = document.getElementById("cadastrarProdutoButton")

// cadastrarProdutoForm.                   addEventListener("submit", adminPage.cadastrarNovoProduto)
adicionarProduto.                       addEventListener("click", adminPage.cadastrarProduto)
span.                                   addEventListener("click", adminPage.fecharModal)
window.                                 addEventListener("click", function(event) {
    if (event.target == cadastrarProdutoModal) {
        adminPage.fecharModal();
    }
})

cadastrarProdutoButton.addEventListener('click', (e) => {
    e.preventDefault()
    adminPage.cadastrarNovoProduto()
})

categoriaInedita.addEventListener("keyup", () => {
    adminPage.categoriaCustomizada  = categoriaInedita.value
    console.log(adminPage.categoriaCustomizada)
})