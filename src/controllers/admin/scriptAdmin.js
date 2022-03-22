import { adminPage }                    from "./cadastrarProduto.js"
import { cadastrarProdutoModal }        from "./cadastrarProduto.js"

const adicionarProduto                  = document.getElementById("adicionarProduto")
const span                              = document.getElementsByClassName("close")[0];

adicionarProduto.                       addEventListener("click", adminPage.cadastrarProduto)
span.                                   addEventListener("click", adminPage.fecharModal)
window.                                 addEventListener("click", function(event) {
    if (event.target == cadastrarProdutoModal) {
        adminPage.fecharModal();
    }
})