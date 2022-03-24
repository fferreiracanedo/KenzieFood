import { LocalStorage } from "../localStorage.js"

export class RegistroAPI {
    static API_URL = 'https://kenzie-food-api.herokuapp.com/'
    static async registrar(data) {
        fetch(`${this.API_URL}auth/register`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok == true) {
                    window.location.href = "./login.html"
                }
            })
    }

    static async login(data) {
        const response = await fetch(`${this.API_URL}auth/login`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
        const responseData = response.json()
            .then((req) => {
                if (req.status == 'Error') {
                    window.location.href = '../pages/register.html'
                } else if (req) {
                    LocalStorage.addLocalStorage(req)
                    window.location.href = '../../index.html'
                }
            })

    }
}