import axios from 'axios'


let xiaoshop = axios.create({
    baseURL:  "http://xiaoshop.top/v1",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
})

export function register(data) {
    return xiaoshop.post('/users', data)
}


export function login(data) {
    return xiaoshop.post('/users/login', data)
}