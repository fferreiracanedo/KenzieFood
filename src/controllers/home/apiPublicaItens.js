import { filtroDinamico } from "./filtroDinamico.js";

export class ApiPublica {
    static dataList

    static async buscarProdutosApi() {

        const url = await fetch("https://kenzie-food-api.herokuapp.com/products")
        this.dataList = await url.json()

        this.dataList.forEach(({ nome, preco, categoria, descricao, imagem }) => {

            const vitrineProdutos = document.getElementById("vitrineProdutos");
            const cardProduto = document.createElement("div");

            cardProduto.classList.add("cardProduto");


            cardProduto.innerHTML = `<img src="${imagem}"></img>
          <p id="produtoCategoria">${categoria}</p>
          <h2 id="produtoNome">${nome}</h2>
          <p id="produtoDescricao"> ${descricao}</p>
          <div id="precoBtn">
          <h4 id="produtoPreco">R$${preco}</h4>
          <button id="btnAdicionarCarrinho"></button>
          </div>
          `;
            vitrineProdutos.appendChild(cardProduto);

        });

    }
}
