import { ApiPublica } from "./apiPublicaItens.js"

const content = await ApiPublica.buscarProdutosApi()

export class ButtoesPesquisa{
    static arrayProdutos = []

    static filtrarTotal(){
        
       content.filter((produto)=>{
            if(produto.categoria){
                this.arrayProdutos.push(produto)
                ApiPublica.template(this.arrayProdutos)
            }
        })

        console.log(this.arrayProdutos)
      
        this.arrayProdutos = []
    }


    static filtrarCategorias(event){

            const inputs = event.target
 
            content.filter((produto)=>{
                                                                        
                if(produto.categoria == inputs.value){
                   
                    
                    this.arrayProdutos.push(produto)
                }
                              
                       
            })
     
        ApiPublica.template(this.arrayProdutos)
        this.arrayProdutos = []
        
    }
 
}
 