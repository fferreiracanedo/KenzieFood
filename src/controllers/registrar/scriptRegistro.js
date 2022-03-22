import { UsuarioAnonimo } from "../login/usuarioAnonimo.js"
import { FormularioRegistro } from "./formRegistrar.js"

const formCadastro  = document.getElementById('formCadastro')
formCadastro.addEventListener('submit', FormularioRegistro.returnForm)

const entrarComoAnonimo = document.getElementById('entrarComoAnonimo')
entrarComoAnonimo.addEventListener('click', UsuarioAnonimo.entrarAnonimo)
