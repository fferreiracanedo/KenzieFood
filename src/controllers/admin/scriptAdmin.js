import { LocalStorage }                 from "../localStorage.js";
import { AdminAPI }                     from "./adminAPI.js";
import { adminPage }                    from "./cadastrarProduto.js"

import { cadastrarProdutoModal }        from "./cadastrarProduto.js"
import { botoesCategoria }              from "./cadastrarProduto.js"
import { cadastrarProdutoCategorias }   from "./cadastrarProduto.js"

// AUTENTICACAO
LocalStorage.getLocalStorageAutenticadorAdmin()

adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")

AdminAPI.produtos()


const adicionarProduto                  = document.getElementById("adicionarProduto")
const span                              = document.getElementsByClassName("close")[0];
const cadastrarProdutoForm              = document.getElementById("cadastrarProdutoForm");
const cadastrarProdutoButton            = document.getElementById("cadastrarProdutoButton")

cadastrarProdutoButton.                 addEventListener("click", (e)=>{
    e.preventDefault()
    adminPage.cadastrarNovoProduto()
})
adicionarProduto.                       addEventListener("click", adminPage.cadastrarProduto)

adicionarProduto.addEventListener("click", () => {
    cadastrarProdutoCategorias.innerHTML=""
    adminPage.carregarCategorias("my/products", cadastrarProdutoCategorias, "Cadastro")
    setTimeout(() => adminPage.habilitarSelecaoCategorias("Cadastro"), 1000)
    setTimeout(() => adminPage.gerarCustomizarCategoria(), 100)
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