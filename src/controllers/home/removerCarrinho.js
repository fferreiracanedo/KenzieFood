import { Carrinho } from "./adicionarCarrinho.js"
export class RemoverCarrinhar{
    static removerItemCarrinho(array){
        const botoesRemover = document.querySelectorAll('.tirarCarrinho')
        botoesRemover.forEach((btn) => { 
            btn.addEventListener("click", (e) => { 
                const click = e.target
                console.log(array)

                const cardClick = click.closest('.cardProduto').id
                console.log()
                this.removerItemCarrinhoAutenticado(cardClick.replace(/^./, ""))
                Carrinho.removerCarrinhoAutenticado(cardClick)
                }) 
                
            })
    }

    static removerItemCarrinhoAutenticado(id){
        const tokenDaEquipe = localStorage.getItem('key').replaceAll(`"`, ``)

        fetch(`https://kenzie-food-api.herokuapp.com/cart/remove/${id}`, {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenDaEquipe}`
            }
        })
        
    }

    static removerItemCarrinhoAnonimo(){
        const botoesRemover = document.querySelectorAll('.tirarCarrinho')
        botoesRemover.forEach((btn) => { 
            btn.addEventListener("click", (e) => { 
                const click = e.target
                const cardClick = click.closest('.cardProduto')
                Carrinho.removerCarrinhoAnonimo(cardClick)

                    const totalCarrinho = document.getElementById('spanValorCarrinho')
                    let valorTotal = 0
                    const valores = document.querySelectorAll('.valorProdutoCarrinho')
                    valores.forEach((valor) => {
                        const valorAtual = Number(valor.innerText.slice(2))
                        valorTotal   += valorAtual
                    })
                    totalCarrinho.innerText = valorTotal 
            
            }) 
            })
    }
}