import { RegistroAPI } from "../registrar/registroAPI.js"

export class FormularioLogin{
    static returnForm(e){
        e.preventDefault()
            
        if(e.target.email.value && e.target.senha.value){
            const infoLogin = {
                "email": `${e.target.email.value}`,
                "password": `${e.target.senha.value}`
            }
            RegistroAPI.login(infoLogin)
        }
        
    }
}