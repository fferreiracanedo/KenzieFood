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
          <div class="cardCarrinho">
          <img id="imgCarrinho" src="${imagem}"></img>
          <div class="descricaoItens">
          <p id="produtoCategoriaCarrinho">${categoria}</p>
          <h2 id="produtoNomeCarrinho">${nome}</h2>
          <h4 class="valorProdutoCarrinho" id="produtoPrecoCarrinho">R$${preco.toFixed(2)}</h4>
          </div>
          <button class="tirarCarrinho" id="btnTirarCarrinho">X</button>
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
      this.vitrineCarrinho.removeChild(no)
      const valores = document.querySelectorAll('.valorProdutoCarrinho')
      const qtdCarrinho = document.getElementById('spanQtdCarrinho')
      const totalCarrinho = document.getElementById('spanValorCarrinho')
      let valorTotal = 0
      let comprimento = []
      valores.forEach((valor) => {
          const valorAtual = Number(valor.innerText.slice(2))
          valorTotal   += valorAtual
          comprimento.push(valor)
      })
      qtdCarrinho.innerText = comprimento.length
      totalCarrinho.innerText = valorTotal 
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
      .then((data) => {
        this.arrayProdutos.produtos = data

      })
    
      this.templateCarrinhoAutenticado(this.arrayProdutos.produtos)
      
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
    this.vitrineCarrinho.innerHTML = ""
    array.forEach(({nome,imagem,categoria,id,preco, quantidade}) => {
      const cardProduto = document.createElement("div");
      cardProduto.innerHTML = "";
      cardProduto.classList.add("cardProduto");
      cardProduto.id = `c${id}`

      cardProduto.innerHTML = `
        <div class="cardCarrinho">
          <img id="imgCarrinho" src="${imagem}"></img>
          <div class="descricaoItens">
          <p id="produtoCategoriaCarrinho">${categoria}</p>
          <h2 id="produtoNomeCarrinho">${nome}</h2>
          <h4 class='valorProdutoCarrinho'id="produtoPrecoCarrinho">R$${preco.toFixed(2)}</h4>
          </div>
          <button class="tirarCarrinho" id="btnTirarCarrinho">X</button>
          </div>
      `;          
      this.vitrineCarrinho.appendChild(cardProduto);
      
    }) 
    
}

  static adicionarCarrinhoDinamic({nome,imagem,categoria,id,preco}){
    const cardProduto = document.createElement("div");
    cardProduto.innerHTML = "";
    cardProduto.classList.add("cardProduto");
    cardProduto.id = `c${id}`

    cardProduto.innerHTML = `
      <div class="cardCarrinho">
        <img id="imgCarrinho" src="${imagem}"></img>
        <div class="descricaoItens">
        <p id="produtoCategoriaCarrinho">${categoria}</p>
        <h2 id="produtoNomeCarrinho">${nome}</h2>
        <h4  class='valorProdutoCarrinho' id="produtoPrecoCarrinho">R$${preco.toFixed(2)}</h4>
        </div>
        <button class="tirarCarrinho" id="btnTirarCarrinho">X</button>
        </div>
    `;          
    this.vitrineCarrinho.appendChild(cardProduto);
    
    RemoverCarrinhar.removerItemCarrinho(this.arrayCarrinhoAutenticado)

  }
}
