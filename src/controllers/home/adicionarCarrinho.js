export class Carrinho {

   
    static vitrineCarrinho = document.getElementById("vitrineCarrinho");

    static templateCarrinho(array) {
        this.vitrineCarrinho.innerHTML = ""
      array.forEach(({nome,imagem,categoria,descricao,preco}) => {
        const cardProduto = document.createElement("div");
        cardProduto.innerHTML = "";
        cardProduto.classList.add("cardProduto");

        cardProduto.innerHTML = `
            <img src="${imagem}"></img>
            <p id="produtoCategoria">${categoria}</p>
            <h2 id="produtoNome">${nome}</h2>
            <div id="precoBtn">
            <h4 id="produtoPreco">R$${preco}</h4>
            <button id="btnAdicionarCarrinho">+</button>
            </div>
`;          this.vitrineCarrinho.appendChild(cardProduto);
 }) 
    }
}
