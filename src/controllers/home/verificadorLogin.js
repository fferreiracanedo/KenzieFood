import { LocalStorage } from "../localStorage.js"

export class Autenticador{
    static autenticar(){
        LocalStorage.getLocalStorageAutenticador()
    }
    static usuarioAtual(){
        const usuarioAtual = JSON.parse(localStorage.getItem("key"))
        if(usuarioAtual == "USUARIOANONIMO"){
            return 'anonimo'
        }
        else{
            return 'autenticado'
        }
    }
}