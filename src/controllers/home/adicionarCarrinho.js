import { RemoverCarrinhar } from "./removerCarrinho.js";

export class Carrinho {
    static arrayCarrinho = JSON.parse(localStorage.getItem('carrinhoLs')) || []
    static vitrineCarrinho = document.getElementById("vitrineCarrinho")
    static arrayProdutos = {}
    static arrayCarrinhoAutenticado = []

    static templateCarrinho(array) {
        this.vitrineCarrinho.innerHTML = ""
        array.forEach(({nome,imagem,categoria,id,preco}) => {
          const cardProduto = document.createElement("div");
          cardProduto.innerHTML = "";
          cardProduto.classList.add("cardProduto");
          cardProduto.id = `${id}`

          cardProduto.innerHTML = `
              <img src="${imagem}"></img>
              <p id="produtoCategoria">${categoria}</p>
              <h2 id="produtoNome">${nome}</h2>
              <div id="precoBtn">
              <h4 id="produtoPreco">R$${preco}</h4>
              <button class="tirarCarrinho" id="btnTirarCarrinho">-</button>
              </div>
          `;          
          this.vitrineCarrinho.appendChild(cardProduto);
        }) 
    }

    static adicionarNoCarrinhoAnonimo(id, array){
      this.arrayCarrinho.push(Number(id))
      localStorage.setItem('carrinhoLs', JSON.stringify(this.arrayCarrinho))
      this.mandarInterface(array,JSON.parse(localStorage.getItem('carrinhoLs')))
    }

    static mandarInterface(arrayProdutos,arrayID){
      console.log(arrayProdutos)
      console.log(arrayID)
      let arrayProd = []
      for(let i = 0; i < arrayID.length;i++){
        const filtro = arrayProdutos.find((produto) => produto.id == arrayID[i])
        arrayProd.push(filtro)
      }
      this.templateCarrinho(arrayProd)
      RemoverCarrinhar.removerItemCarrinhoAnonimo()
    }

    static startCarrinhoAnonimo(arrayProdutos){
      let arrayProd = []
      for(let i = 0; i < this.arrayCarrinho.length;i++){
        const filtro = arrayProdutos.find((produto) => produto.id == this.arrayCarrinho[i])
        arrayProd.push(filtro)
      }
      this.templateCarrinho(arrayProd)
    }

    static removerCarrinhoAnonimo(id){
      const arrayProdutosAtt = this.arrayCarrinho.indexOf(Number(id))
      const arrayFiltro = this.arrayCarrinho.splice(arrayProdutosAtt,1)
      localStorage.setItem('carrinhoLs', JSON.stringify(this.arrayCarrinho))
      this.vitrineCarrinho.removeChild(id)

      const qtdCarrinho = document.getElementById('spanQtdCarrinho')
      qtdCarrinho.innerText = this.arrayCarrinho.length
      
    }

    static removerCarrinhoAutenticado(id){
      const no = document.getElementById(`${id}`);
      console.log(no)
      this.vitrineCarrinho.removeChild(no)
    }

    static adicionarCarrinhoAutenticado(data){
      const tokenDaEquipe = localStorage.getItem('key').replaceAll(`"`, ``)

      fetch('https://kenzie-food-api.herokuapp.com/cart/add', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenDaEquipe}`
        },
        "body": JSON.stringify(data),
        })
        
    }

    static async renderizarCarrinhoAutenticado(){
      const tokenDaEquipe = localStorage.getItem('key').replaceAll(`"`, ``)
      await fetch('https://kenzie-food-api.herokuapp.com/cart', {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenDaEquipe}`
        },
      })
      .then((request) => request.json())
      .then((data) => this.arrayProdutos.produtos = data)
      
      return this.arrayProdutos.produtos
    }

    static getProduto(array) {
      let produtosCarrinho = []
      array.forEach((produto) => {
        const produtoAtual  = produto.products
        const qtdProduto    = produto.quantity
        const newProduto = produto.products.quantidade = qtdProduto
        
        produtosCarrinho.push(produtoAtual)
        this.arrayCarrinhoAutenticado.push(produtoAtual)

      }) 
      this.templateCarrinhoAutenticado(produtosCarrinho)
  }

  static templateCarrinhoAutenticado(array) {
    console.log(array)
    this.vitrineCarrinho.innerHTML = ""
    array.forEach(({nome,imagem,categoria,id,preco}) => {
      const cardProduto = document.createElement("div");
      cardProduto.innerHTML = "";
      cardProduto.classList.add("cardProduto");
      cardProduto.id = `c${id}`

      cardProduto.innerHTML = `
          <img src="${imagem}"></img>
          <p id="produtoCategoria">${categoria}</p>
          <h2 id="produtoNome">${nome}</h2>
          <div id="precoBtn">
          <h4 id="produtoPreco">R$${preco}</h4>
          <button class="tirarCarrinho" id="btnTirarCarrinho">-</button>
          </div>
      `;          
      this.vitrineCarrinho.appendChild(cardProduto);
    }) 
}

}
