export class LocalStorage{
    static addLocalStorage(data){
        localStorage.setItem('key', JSON.stringify(data))
    }
    static getLocalStorageAutenticador(){
        if(localStorage.getItem('key') == undefined){
            window.location.href = './src/pages/register.html'
        }

    }

    static getLocalStorageAutenticadorAdmin(){
        if(localStorage.getItem('key') == undefined){
            window.location.href = './register.html'
        }
        if(JSON.parse(localStorage.getItem('key')) == 'USUARIOANONIMO'){
            window.location.href = '../../index.html'
        }
    }
}