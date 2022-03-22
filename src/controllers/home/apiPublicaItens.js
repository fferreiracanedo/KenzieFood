export class ApiPublica {
    static async buscarProdutosApi() {
        await fetch("https://kenzie-food-api.herokuapp.com/products")
            .then((res) => res.json())
            .then((data) => {
                data.forEach(({ nome, preco, categoria, descricao, imagem }) => {
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
            });
    }
}
