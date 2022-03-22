export class LocalStorage{
    static addLocalStorage(data){
        localStorage.setItem('key', JSON.stringify(data))
    }
    static getLocalStorageAutenticador(){
        if(localStorage.getItem('key') == undefined){
            window.location.href = './src/pages/register.html'
        }

    }
}