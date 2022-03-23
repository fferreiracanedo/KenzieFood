import { FormularioLogin } from "./formLogin.js"
import { UsuarioAnonimo } from "./usuarioAnonimo.js"


const formLogin = document.getElementById('formLogin')
formLogin.addEventListener('submit',FormularioLogin.returnForm)

const entrarComoAnonimo = document.getElementById('entrarComoAnonimo')
entrarComoAnonimo.addEventListener('click', UsuarioAnonimo.entrarAnonimo)