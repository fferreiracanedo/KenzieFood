export class adminPage {

    static cadastrarProduto (){
        cadastrarProdutoModal.style.display = "block";
        
    }

    static fecharModal (){
        cadastrarProdutoModal.style.display = "none";
    }

}

export const cadastrarProdutoModal             = document.getElementById("cadastrarProdutoModal");