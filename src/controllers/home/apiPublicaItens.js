export class ApiPublica {
    static async buscarProdutosApi() {
        let arrayProdutos = []


        await fetch("https://kenzie-food-api.herokuapp.com/products")
            .then((res) => res.json())
            .then((data) => {
                data.forEach((produto) => {
                    // const template = ApiPublica.template(produto);
                    // vitrineProdutos.appendChild(template);
                    arrayProdutos.push(produto)
                });
            });

        return arrayProdutos


    }

    static vitrine = document.getElementById("vitrineProdutos");

    static template(array) {
        this.vitrine.innerHTML = ""
      array.forEach(({nome,imagem,categoria,descricao,preco, id}) => {
        const cardProduto = document.createElement("div");
        cardProduto.innerHTML = "";
        cardProduto.classList.add("cardProduto");
        cardProduto.id = `${id}`
        cardProduto.innerHTML = `
            <img src="${imagem}"></img>
            <p id="produtoCategoria">${categoria}</p>
            <h2 id="produtoNome">${nome}</h2>
            <p id="produtoDescricao"> ${descricao}</p>
            <div id="precoBtn">
            <h4 id="produtoPreco">R$${preco}</h4>

            </div>
`; this.vitrine.appendChild(cardProduto);
        })

    }
}
