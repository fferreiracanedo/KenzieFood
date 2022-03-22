import { LocalStorage } from "../localStorage.js";
import { AdminAPI } from "./adminAPI.js";
import { adminPage }                    from "./cadastrarProduto.js"
import { cadastrarProdutoModal }        from "./cadastrarProduto.js"

LocalStorage.getLocalStorageAutenticadorAdmin()

AdminAPI.produtos()


const adicionarProduto                  = document.getElementById("adicionarProduto")
const span                              = document.getElementsByClassName("close")[0];

adicionarProduto.                       addEventListener("click", adminPage.cadastrarProduto)
span.                                   addEventListener("click", adminPage.fecharModal)
window.                                 addEventListener("click", function(event) {
    if (event.target == cadastrarProdutoModal) {
        adminPage.fecharModal();
    }
})

adminPage.carregarCategorias("my/products")