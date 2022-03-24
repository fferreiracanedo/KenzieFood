import { AdminAPI }                     from "./adminAPI.js";
import { AddEventListener } from "./filtros.js";

export class adminPage {
    static excluirProdutoModal      = document.getElementById("modal-delete")
    static editarProdutoCategorias  = document.getElementById("editarProdutoCategorias");    
    static API_URL                  = 'https://kenzie-food-api.herokuapp.com/'
    static categoriaProdutos        = [];
    static categoriasEscolhidas     = [];
    static collection               = document.getElementsByTagName("input")
    static categoriaCustomizada     = ""
    static categoriaInedita         = ""
    static categoriaMainPage        = []

    static abrirModal (modal){
        modal.style.display = "flex";
    }

    static fecharModal (modal){
        modal.style.display = "none";
    }

    static async gerarCustomizarCategoria(){
        const categoriaInedita = document.createElement("input")
        categoriaInedita.setAttribute("type", "text")
        categoriaInedita.setAttribute("id", "categoriaInedita")
        categoriaInedita.setAttribute("placeholder", "Nova Categoria")
        cadastrarProdutoCategorias.appendChild(categoriaInedita)
        adminPage.categoriaInedita                  = document.getElementById("categoriaInedita")
    }

    static async carregarCategorias (url, area, buttonID){
        const tokenDaEquipe     = localStorage.getItem('key').replaceAll(`"`, ``)
        this.categoriaProdutos  = []

        const res = await fetch(`${this.API_URL}${url}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenDaEquipe}`
            },
        })
        .then((res) => res.json())
        .then((res) => {
            res.forEach((produto) => {
                this.categoriaMainPage.push(produto.categoria)
                if (produto.categoria.includes(',')){
                    let arr = produto.categoria.split(',')
                    arr.forEach((novoProduto) => {
                        if (!this.categoriaProdutos.includes(novoProduto)) {
                            let upperCase = novoProduto.replace(novoProduto[0], novoProduto[0].toUpperCase())
                            this.categoriaProdutos.push(upperCase)
                        }
                    })
                }
            })
            return res
        })
        .then((res) => {
            res.forEach((produto) => {
                if (!this.categoriaProdutos.includes(produto.categoria) && !produto.categoria.includes(',')){
                    this.categoriaProdutos.push(produto.categoria)
                }
            })
            return this.categoriaProdutos
        })
        .then(() =>{
            this.categoriaProdutos.forEach((categoria) => {
                const novaCategoria = document.createElement("input");
                novaCategoria.setAttribute("type", "button")
                area.appendChild(novaCategoria);
                novaCategoria.setAttribute("class", "categoriasVitrine");
                novaCategoria.setAttribute("id", `${categoria.toLowerCase()}${buttonID}Button`);

                novaCategoria.value = `${categoria}`

            });
        })
        .then(() =>{
            
        })
        
    }

    static async habilitarSelecaoCategorias(area){
        adminPage.categoriasEscolhidas.length = 0
        for (let i = 0; i < adminPage.collection.length; i++) {
            if (adminPage.collection[i].id.includes(`${area}Button`)){
                adminPage.collection[i].addEventListener("click", (event) => {
                    
                    const categoriaProdutoClicado = event.target.value
                    if (!adminPage.categoriasEscolhidas.includes(categoriaProdutoClicado)){
                        adminPage.categoriasEscolhidas.push(categoriaProdutoClicado)
                    } else if (adminPage.categoriasEscolhidas.includes(categoriaProdutoClicado)) {
                        for (let k = 0; k < adminPage.categoriasEscolhidas.length; k++) {
                            if (adminPage.categoriasEscolhidas[k] === categoriaProdutoClicado){
                                adminPage.categoriasEscolhidas.splice(k,1)
                            }
                        }
                    }

                    const buttonClass             = event.target.getAttribute("class")
                    if (buttonClass === "categoriasVitrine"){
                        event.target.setAttribute("class", "categoriaProdutoSelected")
                        event.target.setAttribute("width", "4px")
                    } else {
                        event.target.setAttribute("class", "categoriasVitrine")
                    }
                }) 
            }
        }
    }

    static async cadastrarNovoProduto (){

        const tokenDaEquipe                  = localStorage.getItem('key').replaceAll(`"`, ``)
        const nomeProduto                    = document.querySelector('input[name="nomeProduto"]')
        const descricaoProduto               = document.querySelector('input[name="descricaoProduto"]')
        const valorProduto                   = document.querySelector('input[name="valorProduto"]')
        const imagemProduto                  = document.querySelector('input[name="imagemProduto"]')
        
        const data = {
            "nome": `${nomeProduto.value}`,
            "preco": valorProduto.value,
            "categoria": `${adminPage.categoriasEscolhidas.toString()}`,
            "imagem": `${imagemProduto.value}`,
            "descricao" : `${descricaoProduto.value}`,
        }

        if (adminPage.categoriaCustomizada !== ""){
           
            if (adminPage.categoriaProdutos.includes(adminPage.categoriaCustomizada)){
                window.alert("Não é possível registrar esta nova categoria pois ela já existe!")
            } else {
                adminPage.categoriasEscolhidas.push(adminPage.categoriaCustomizada)
            }
        }
        
        fetch(`${this.API_URL}my/products`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenDaEquipe}`
            },
        "body": JSON.stringify(data),
        })
        .then((res) => {
            notificationPopup.setAttribute("class", "notification-popup")
            if (res.status === 201){
                notificationPopupTexto.innerHTML=`<p>Produto Adicionado com sucesso!</p>`
                notificationPopupColor.style.backgroundColor = "#39DF8F"
                adminPage.categoriasEscolhidas.length = 0
                adminPage.fecharModal(cadastrarProdutoModal)
                nomeProduto.value = ""
                descricaoProduto.value = ""
                valorProduto.value = ""
                imagemProduto.value = ""
                const vitrineBotoes = document.getElementById('botoesCategoria') 

                vitrineBotoes.innerHTML = `
                <button id="btnTodos" style="background: #efefef;margin-top: 0;">Todos</button>
                `
                AddEventListener.colocarADD()
                adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")
                for (let z = 0; z < adminPage.collection.length; z++){
                    if (adminPage.collection[z].id.includes("CadastroButton")){
                        adminPage.collection[z].setAttribute("class", "categoriasVitrine")
                    }
                }
                AdminAPI.produtos()
            } else {
                notificationPopupTexto.innerHTML=`<p>Ocorreu algum erro. Produto não adicionado!</p>`
                notificationPopupColor.style.backgroundColor = "#fc0303"
            }
            setTimeout(() => {
                notificationPopup.setAttribute("class", "notification-popup--hide")
            },5000)

        })
    }

    static async editarProdutoExistente (idProduto){
        adminPage.editarProdutoCategorias.innerHTML=""
        const UserToken = localStorage.getItem('key').replaceAll(`"`, ``)
        adminPage.abrirModal(editarProdutoModal)
        setTimeout(() => adminPage.habilitarSelecaoCategorias("Edicao"), 900)
        const excluirProdutoButton = document.getElementById("excluirProdutoButton")

        excluirProdutoButton.addEventListener("click", (evt) => {
            evt.preventDefault()
            adminPage.abrirModal(adminPage.excluirProdutoModal)
            adminPage.fecharModal(editarProdutoModal)
        })

        const nomeProduto       = editarProdutoModal.querySelector('input[name="nomeProduto"]')
        const descricaoProduto  = editarProdutoModal.querySelector('textarea[name="descricaoProduto"]')
        const valorProduto      = editarProdutoModal.querySelector('input[name="valorProduto"]')
        const imagemProduto     = editarProdutoModal.querySelector('input[name="imagemProduto"]')

        fetch(`https://kenzie-food-api.herokuapp.com/my/products`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${UserToken}`
            }
        })
        .then((res) => res.json())
        .then((res) => res)
        .then((res) => {
            adminPage.carregarCategorias("my/products", adminPage.editarProdutoCategorias, "Edicao")
            res.forEach((produto) => {
                if (idProduto === produto.id){
                    nomeProduto.value = produto.nome;
                    descricaoProduto.value = produto.descricao
                    valorProduto.value = produto.preco 
                    imagemProduto.value = produto.imagem
                }
            })
        })
        .then(() => {
            salvarEdicaoButton.addEventListener("click", function (evt){
                evt.preventDefault()

                let data = ''
                if (adminPage.categoriasEscolhidas.length === 0){
                    data = {
                        "nome": `${nomeProduto.value}`,
                        "preco": valorProduto.value,
                        "imagem": `${imagemProduto.value}`,
                        "descricao" : `${descricaoProduto.value}`,
                    }
                } else {
                    data = {
                        "nome": `${nomeProduto.value}`,
                        "preco": valorProduto.value,
                        "categoria": `${adminPage.categoriasEscolhidas.toString()}`,
                        "imagem": `${imagemProduto.value}`,
                        "descricao" : `${descricaoProduto.value}`,
                    }
                }

                fetch(`https://kenzie-food-api.herokuapp.com/my/products/${idProduto}`, {
                    "method": "PATCH",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${UserToken}`
                    },
                    "body": JSON.stringify(data),
                })
                .then((res) => {
                    notificationPopup.setAttribute("class", "notification-popup")
                    if (res.status === 202){
                        notificationPopupTexto.innerHTML=`<p>Produto Atualizado com sucesso!</p>`
                        notificationPopupColor.style.backgroundColor = "#39DF8F"
                        adminPage.categoriasEscolhidas.length = 0
                        adminPage.fecharModal(editarProdutoModal)
                        nomeProduto.value = ""
                        descricaoProduto.value = ""
                        valorProduto.value = ""
                        imagemProduto.value = ""
                        for (let z = 0; z < adminPage.collection.length; z++){
                            if (adminPage.collection[z].id.includes("EdicaoButton")){
                                adminPage.collection[z].setAttribute("class", "categoriasVitrine")
                            }
                        }
                        AdminAPI.produtos()
                    } else {
                        notificationPopupTexto.innerHTML=`<p>Ocorreu algum erro. Produto não editado!</p>`
                        notificationPopupColor.style.backgroundColor = "#fc0303"
                    }
                    setTimeout(() => {
                        notificationPopup.setAttribute("class", "notification-popup--hide")
                    },5000)
                })
            })
        })
    }

    static async deletarProdutoExistente (idProduto) {
        const UserToken = localStorage.getItem('key').replaceAll(`"`, ``)

        adminPage.abrirModal(adminPage.excluirProdutoModal)

        const excluirProdutoSim                 = document.getElementById("excluirProdutoSim");
        const excluirProdutoNao                 = document.getElementById("excluirProdutoNao");

        excluirProdutoSim.addEventListener("click", (evt) => {
            evt.preventDefault()
            fetch(`https://kenzie-food-api.herokuapp.com/my/products/${idProduto}`, {
                "method": "DELETE",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${UserToken}`
                }
            })
            .then((res) => {
                notificationPopup.setAttribute("class", "notification-popup")
                if (res.status === 204){
                    notificationPopupTexto.innerHTML=`<p>Produto Excluído com sucesso!</p>`
                    notificationPopupColor.style.backgroundColor = "#39DF8F"
                    adminPage.categoriasEscolhidas.length = 0
                    adminPage.fecharModal(adminPage.excluirProdutoModal)
                    AdminAPI.produtos()
                    const vitrineBotoes = document.getElementById('botoesCategoria') 

                    vitrineBotoes.innerHTML = `
                    <button id="btnTodos" style="background: #efefef;margin-top: 0;">Todos</button>
                    `
                    adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")
                    AddEventListener.colocarADD()

                } else {
                    notificationPopupTexto.innerHTML=`<p>Ocorreu algum erro. Produto não excluído!</p>`
                    notificationPopupColor.style.backgroundColor = "#fc0303"
                }
                setTimeout(() => {
                    notificationPopup.setAttribute("class", "notification-popup--hide")
                },5000)
            })
        })

        const botaofecharPopup = document.getElementsByClassName("botaoFecharPopup")[0]
        function fecharPop(){
            notificationPopup.setAttribute("class", "notification-popup--hide")
        }
        excluirProdutoNao.addEventListener("click", (evt) => {
            evt.preventDefault()
            notificationPopup.setAttribute("class", "notification-popup")
            notificationPopupTexto.innerHTML=`<p>Produto não foi excluído!</p>`
            notificationPopupColor.style.backgroundColor = "#FFDA29"
            adminPage.categoriasEscolhidas.length = 0
            adminPage.fecharModal(adminPage.excluirProdutoModal)
            console.log(notificationPopup)
            console.log(botaofecharPopup)
            botaofecharPopup.addEventListener("click", fecharPop)
            setTimeout(() => {
                notificationPopup.setAttribute("class", "notification-popup--hide")
               

            },5000)
        })
    }

}
export const cadastrarProdutoCategorias        = document.getElementById("cadastrarProdutoCategorias");
export const botoesCategoria                   = document.getElementById("botoesCategoria");
export const cadastrarProdutoModal             = document.getElementById("cadastrarProdutoModal");
export const notificationPopup                 = document.getElementById("notificationPopup")
export const notificationPopupTexto            = document.getElementsByClassName("notification-popup__corpo")[0]
export const notificationPopupColor            = document.getElementsByClassName("notification-popup__status")[0]
export const editarProdutoModal                = document.getElementById("editarProdutoModal")
export const salvarEdicaoButton                = document.getElementById("salvarEdicaoButton")
export const categoriasEscolhidas              = []
