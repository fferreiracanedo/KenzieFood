import { CardProduto } from "../admin/cardProdutos.js";
import { ApiPublica } from "./apiPublicaItens.js";

export class PesquisaDinamica {
    static arrayProdutos = [];

    static filtroPesquisa(array, pesquisa) {
        if (pesquisa.length == 0) {
            ApiPublica.template(array);
        }

        array.filter((produto) => {
            const filtroCategoria = produto.categoria
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            const filtroProduto = produto.nome
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            const pesquisaFiltro = pesquisa
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            if (filtroProduto.includes(pesquisaFiltro) || filtroCategoria.includes(pesquisaFiltro)) {
                this.arrayProdutos.push(produto);
                console.log(pesquisa);
            }
        });

        ApiPublica.template(this.arrayProdutos);
        this.arrayProdutos = [];
    }

    static filtroPesquisaTeclas(array, pesquisa) {
        let arrayProdutos = []
        if (pesquisa.length == 0) {
            ApiPublica.template(array)
        }

        array.filter((produto) => {
            const filtroCategoria = produto.categoria
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            const filtroProduto = produto.nome
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            const pesquisaFiltro = pesquisa
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            if (filtroProduto.includes(pesquisaFiltro) || filtroCategoria.includes(pesquisaFiltro)) {
                arrayProdutos.push(produto)
                console.log(pesquisa)
            }
        });
        CardProduto.templateCard(arrayProdutos)

    }
}
