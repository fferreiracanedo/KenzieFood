export class ApiPublica {
  static async buscarProdutosApi() {
    await fetch('https://kenzie-food-api.herokuapp.com/products')
      .then(res => res.json())
      .then(data => {
        data.forEach(({ nome, preco, categoria, descricao, imagem }) => {
          const cardProdutos = document.getElementById('card-produtos')
          const div = document.createElement('div')

          div.innerHTML = `<img src="${imagem}"></img>
          <p>${categoria}</p>
          <h2>${nome}</h2>
          <p>${descricao}</p>
          <h4>R$${preco}</h4>
          `
          cardProdutos.appendChild(div)
        })
      })
  }
}
