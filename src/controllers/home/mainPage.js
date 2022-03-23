import { ApiPublica } from './apiPublicaItens.js'
import { Autenticador } from './verificadorLogin.js'
import { adminPage } from "../admin/cadastrarProduto.js"
import { botoesCategoria } from "../admin/cadastrarProduto.js"


ApiPublica.buscarProdutosApi()
Autenticador.autenticar()
adminPage.carregarCategorias("products", botoesCategoria, "Nav")