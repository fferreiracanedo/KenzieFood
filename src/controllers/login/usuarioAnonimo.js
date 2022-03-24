import { LocalStorage } from "../localStorage.js"

export class UsuarioAnonimo{
    static entrarAnonimo(){
        LocalStorage.addLocalStorage('USUARIOANONIMO')
        window.location.href = '../../index.html'
    }
}