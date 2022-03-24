import { ApiPublica } from "./apiPublicaItens.js"
//import { categoriy} from "./mainPage.js"

const content = await ApiPublica.buscarProdutosApi()


/* let arrayProdutos = []
arrayProdutos.push(content) */
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
        //setTimeout(() => {
            /* const inputCategorias = document.getElementsByTagName("input") */
            
            const inputs = event.target
 
            content.filter((produto)=>{
                                                                        
                if(produto.categoria == inputs.value){
                   
                    
                    this.arrayProdutos.push(produto)
                }
                              
                       
            })
     
        ApiPublica.template(this.arrayProdutos)
        /* console.log(this.arrayProdutos) */
        this.arrayProdutos = []
        
    }

  /*   static filtrarFrutas(){
        content.filter((produto)=>{
            if(produto.categoria === "Frutas"){
                this.arrayProdutos.push(produto)
                
            }
        })

        console.log(this.arrayProdutos)
        ApiPublica.template(this.arrayProdutos)
        this.arrayProdutos = []
    }

    static filtrarPanificadora(){
        content.filter((produto)=>{
            if(produto.categoria === "Panificadora"){
                this.arrayProdutos.push(produto)
                
            }
        })

        console.log(this.arrayProdutos)
        ApiPublica.template(this.arrayProdutos)
        this.arrayProdutos = []
    }

        static filtrarBebidas(){
        content.filter((produto)=>{
            if(produto.categoria === "Bebidas"){
                this.arrayProdutos.push(produto)
                
            }
        })

        console.log(this.arrayProdutos)
        ApiPublica.template(this.arrayProdutos)
        this.arrayProdutos = []
    }  */
 
}
 