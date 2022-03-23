export class ApiPublica {
    static async buscarProdutosApi() {
        const vitrineProdutos = document.getElementById("vitrineProdutos");

        await fetch("https://kenzie-food-api.herokuapp.com/products")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                data.forEach((produto) => {
                    const template = ApiPublica.template(produto);
                    vitrineProdutos.appendChild(template);
                });
            });
    }

    static template({ nome, preco, categoria, descricao, imagem }) {
        const cardProduto = document.createElement("div");
        cardProduto.classList.add("cardProduto");

        cardProduto.innerHTML = `
            <img src="${imagem}"></img>
            <p id="produtoCategoria">${categoria}</p>
            <h2 id="produtoNome">${nome}</h2>
            <p id="produtoDescricao"> ${descricao}</p>
            <div id="precoBtn">
            <h4 id="produtoPreco">R$${preco}</h4>
            <button id="btnAdicionarCarrinho"></button>
            </div>
`;
        return cardProduto;
    }
}
