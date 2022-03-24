import { PesquisaDinamica } from "../home/campoPesquisa.js";
import { LocalStorage }                 from "../localStorage.js";
import { AdminAPI }                     from "./adminAPI.js";
import { adminPage }                    from "./cadastrarProduto.js"

import { cadastrarProdutoModal }        from "./cadastrarProduto.js"
import { editarProdutoModal } from "./cadastrarProduto.js"
import { botoesCategoria }              from "./cadastrarProduto.js"
import { cadastrarProdutoCategorias }   from "./cadastrarProduto.js"
import { CardProduto } from "./cardProdutos.js";
import { AddEventListener } from "./filtros.js";

// AUTENTICACAO
LocalStorage.getLocalStorageAutenticadorAdmin()


AdminAPI.produtos()
const arrProd = await AdminAPI.produtos()
// FILTRO PESQUISA
const filtrarPesquisa = document.getElementById('pesquisa')
filtrarPesquisa.addEventListener('keyup', (e) => {
    const pesquisa = e.target.value
    PesquisaDinamica.filtroPesquisaTeclas(arrProd,pesquisa)
})

AddEventListener.colocarADD()
const adicionarProduto                  = document.getElementById("adicionarProduto")
const spanCadastrarProdutoModal         = document.getElementsByClassName("close")[0];
const spanEditarProdutoModal            = document.getElementsByClassName("close")[1];
const spanExcluirProdutoModal           = document.getElementsByClassName("close")[2];
const cadastrarProdutoForm              = document.getElementById("cadastrarProdutoForm");
const cadastrarProdutoButton            = document.getElementById("cadastrarProdutoButton")

export const editarProdutoCategorias    = document.getElementById("editarProdutoCategorias");
cadastrarProdutoButton.addEventListener("click", (e)=>{

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
    setTimeout(() => adminPage.habilitarSelecaoCategorias("Cadastro"), 900)
    setTimeout(() => adminPage.gerarCustomizarCategoria(), 100)
    setTimeout(() => adminPage.habilitarSelecaoCategorias(), 700)
    setTimeout(() => {
        adminPage.categoriaInedita.addEventListener("keyup", () => {
            adminPage.categoriaCustomizada  = adminPage.categoriaInedita.value
            
        })
    }, 1000)
})

spanCadastrarProdutoModal.addEventListener("click", (evt) => {
    evt.preventDefault()
    adminPage.fecharModal(cadastrarProdutoModal)
})

spanEditarProdutoModal.addEventListener("click", (evt) => {
    evt.preventDefault()
    adminPage.fecharModal(editarProdutoModal)
})

spanExcluirProdutoModal.addEventListener("click", (evt) => {
    evt.preventDefault()
    adminPage.fecharModal(adminPage.excluirProdutoModal)
})

window.                                 addEventListener("click", function(event) {
    if (event.target == cadastrarProdutoModal) {
        adminPage.fecharModal(cadastrarProdutoModal);
    } else if (event.target == editarProdutoModal) {
        adminPage.fecharModal(editarProdutoModal);
    } else if (event.target == adminPage.excluirProdutoModal) {
        adminPage.fecharModal(adminPage.excluirProdutoModal);
    }
})

adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")