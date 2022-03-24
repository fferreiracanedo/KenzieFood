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
            <h4  id="produtoPreco">R$${preco}</h4>
            <button class="adicionarNoCarrinho" id="btnAdicionarCarrinho">
            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6699 7.94287C12.9277 7.94287 13.1621 7.77881 13.2324 7.521L14.334 2.646C14.4043 2.29443 14.1465 1.94287 13.7715 1.94287H4.58398L4.37305 0.911621C4.30273 0.653809 4.06836 0.442871 3.81055 0.442871H1.41992C1.0918 0.442871 0.857422 0.700684 0.857422 1.00537V1.38037C0.857422 1.7085 1.0918 1.94287 1.41992 1.94287H3.03711L4.70117 10.0054C4.2793 10.2397 3.99805 10.6851 4.04492 11.2241C4.06836 11.8804 4.60742 12.4194 5.28711 12.4429C6.03711 12.4897 6.66992 11.8804 6.66992 11.1304C6.66992 10.7788 6.50586 10.4507 6.27148 10.1929H11.1699C10.9355 10.4507 10.7715 10.8022 10.7949 11.1772C10.7949 11.8804 11.3809 12.4429 12.084 12.4429C12.8105 12.4663 13.4199 11.8804 13.4199 11.1304C13.4199 10.6147 13.1152 10.1694 12.6699 9.9585L12.7871 9.396C12.8809 9.04443 12.5996 8.69287 12.248 8.69287H5.9668L5.80273 7.94287H12.6699ZM10.4199 4.38037C10.6074 4.38037 10.7949 4.56787 10.7949 4.75537V5.13037C10.7949 5.34131 10.6074 5.50537 10.4199 5.50537H9.29492V6.44287C9.29492 6.65381 9.10742 6.81787 8.91992 6.81787H8.54492C8.33398 6.81787 8.16992 6.65381 8.16992 6.44287V5.50537H7.04492C6.83398 5.50537 6.66992 5.34131 6.66992 5.13037V4.75537C6.66992 4.56787 6.83398 4.38037 7.04492 4.38037H8.16992V3.44287C8.16992 3.25537 8.33398 3.06787 8.54492 3.06787H8.91992C9.10742 3.06787 9.29492 3.25537 9.29492 3.44287V4.38037H10.4199Z" fill="#0CA678"/>
            </svg>
            </button>

`
 this.vitrine.appendChild(cardProduto);
        })

    }
}
