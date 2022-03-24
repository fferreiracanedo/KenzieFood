import { RegistroAPI } from "./registroAPI.js"

export class FormularioRegistro{
    // PEGAR DADOS DO FORM E MANDA PRA API
    static returnForm(e){
        e.preventDefault()
        
        if(e.target.nome.value && e.target.email.value && e.target.senha.value){
            const infoRegistro = {
                "name": `${e.target.nome.value}`,
                "email": `${e.target.email.value}`,
                "password": `${e.target.senha.value}`
            }
            RegistroAPI.registrar(infoRegistro)
        }
        
    }
}