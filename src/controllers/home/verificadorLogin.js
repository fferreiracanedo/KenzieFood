import { LocalStorage } from "../localStorage.js"

export class Autenticador{
    static autenticar(){
        LocalStorage.getLocalStorageAutenticador()
    }
}