export class adminPage {

    static cadastrarProduto (){
        cadastrarProdutoModal.style.display = "flex";
        
    }

    static fecharModal (){
        cadastrarProdutoModal.style.display = "none";
    }

}

export const cadastrarProdutoModal             = document.getElementById("cadastrarProdutoModal");