export class LocalStorage{
    static addLocalStorage(data){
        localStorage.setItem('key', JSON.stringify(data))
    }
}