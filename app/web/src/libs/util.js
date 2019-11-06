let prefix = 'xiao_shop_'

export function StorageGetter (key) {
    return localStorage.getItem(prefix + key)
}

export function StorageSetter (key, val) {
    return localStorage.setItem(prefix + key, val)
}

export function parseUrl(url = ''){
    let result = {}
    let search = url.split('?')[1]
    let query = search.split('&')
    query.map(v => {
        let [ key, value ] = v.split('=')
        result[key] = value
    })

    return result
}

export default {
    StorageGetter,
    StorageSetter,
    parseUrl
}
