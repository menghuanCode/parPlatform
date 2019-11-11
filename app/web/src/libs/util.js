import jwtDecode from 'jwt-decode'

let prefix = 'xiao_shop_'

export function StorageGetter (key) {
    return localStorage.getItem(prefix + key)
}

export function StorageSetter (key, val) {
    return localStorage.setItem(prefix + key, val)
}

export function parseQuery(url = ''){
    return url
}

export function parseToken(token) {
    let data = jwtDecode(token)
    return data
}

export default {
    StorageGetter,
    StorageSetter,
    parseQuery
}
