import { adminPage } from "./cadastrarProduto.js"

export class CardProduto{
    
    static vitrineCard = document.getElementById('vitrineProdutos')

    static templateCard(arrayProdutos){

        this.vitrineCard.innerHTML=""

        arrayProdutos.forEach(({categoria, descricao, imagem, nome, id}) => {
            const categoriaCardProduto = []
            if (categoria.includes(',')){
                let arr = categoria.split(',')
                    arr.forEach((novoProduto) => {
                        let filtered = novoProduto.replaceAll(' ', '')
                        if (!categoriaCardProduto.includes(filtered)) {
                            let upperCase = filtered.replace(filtered[0], filtered[0].toUpperCase())
                            categoriaCardProduto.push(upperCase)
                        }
                        
                    }) 
            }
            if (!categoriaCardProduto.includes(categoria) && !categoria.includes(',')) {
                let upperCase = categoria.replace(categoria[0], categoria[0].toUpperCase())
                categoriaCardProduto.push(upperCase)
            }
            const containerCard = document.createElement('div')
            containerCard.classList.add('containerCardProduto')
            containerCard.innerHTML = `
                <div class="infoProduto">
                    <img src=${imagem} alt="" srcset="">
                    <h2>${nome}</h2>
                </div>
                <div class="infoCategorias" id="${id}">
                </div>
                <div class="infoDescricao">
                    <p>${descricao}</p>
                </div>
                <div class="infoAcoes">
                    <button value="${id}" id="editar${id}">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.42188 2.46875C9.32812 2.375 9.1875 2.375 9.09375 2.46875L3.98438 7.57812L3.75 9.75781C3.70312 10.0391 3.96094 10.2969 4.24219 10.25L6.42188 10.0156L11.5312 4.90625C11.625 4.8125 11.625 4.67188 11.5312 4.57812L9.42188 2.46875ZM13.2188 1.92969L12.0703 0.78125C11.7188 0.429688 11.1328 0.429688 10.7812 0.78125L9.96094 1.60156C9.86719 1.69531 9.86719 1.83594 9.96094 1.92969L12.0703 4.03906C12.1641 4.13281 12.3047 4.13281 12.3984 4.03906L13.2188 3.21875C13.5703 2.86719 13.5703 2.28125 13.2188 1.92969ZM9 8.63281V11H1.5V3.5H6.86719C6.96094 3.5 7.03125 3.47656 7.07812 3.42969L8.01562 2.49219C8.17969 2.30469 8.0625 2 7.80469 2H1.125C0.492188 2 0 2.51562 0 3.125V11.375C0 12.0078 0.492188 12.5 1.125 12.5H9.375C9.98438 12.5 10.5 12.0078 10.5 11.375V7.69531C10.5 7.4375 10.1953 7.32031 10.0078 7.48438L9.07031 8.42188C9.02344 8.46875 9 8.53906 9 8.63281Z" fill="#868E96"/>
                        </svg>
                    </button>
                    <button value="${id}" id="deletar${id}">
                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.125 1.25H7.3125L7.07812 0.828125C6.98438 0.640625 6.79688 0.5 6.58594 0.5H3.89062C3.67969 0.5 3.49219 0.640625 3.39844 0.828125L3.1875 1.25H0.375C0.164062 1.25 0 1.4375 0 1.625V2.375C0 2.58594 0.164062 2.75 0.375 2.75H10.125C10.3125 2.75 10.5 2.58594 10.5 2.375V1.625C10.5 1.4375 10.3125 1.25 10.125 1.25ZM1.24219 11.4453C1.26562 12.0547 1.75781 12.5 2.36719 12.5H8.10938C8.71875 12.5 9.21094 12.0547 9.23438 11.4453L9.75 3.5H0.75L1.24219 11.4453Z" fill="#868E96"/>
                        </svg>
                    </button>
                </div>
        `

        setTimeout(() => {
            const categoriaCard = document.getElementById(`${id}`)
            categoriaCard.innerHTML=""

            categoriaCardProduto.forEach((categoria) => {
                let categoriaTitle = document.createElement("h3")
                categoriaTitle.innerText=categoria
                categoriaCard.appendChild(categoriaTitle)
            })
        
            const buttonEditar = document.getElementById(`editar${id}`)
            buttonEditar.addEventListener("click", (evt) => {
                evt.preventDefault();
                adminPage.editarProdutoExistente(id)
            })

            const buttonDeletar = document.getElementById(`deletar${id}`)
            buttonDeletar.addEventListener("click", (evt) => {
                evt.preventDefault();
                adminPage.deletarProdutoExistente(id)
            })

        },100)

        this.vitrineCard.appendChild(containerCard)

        })
    }
}