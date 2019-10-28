let prefix = 'xiao_shop_'

let StorageGetter = function (key) {
    return localStorage.getItem(prefix + key)
}

let StorageSetter = function (key, val) {
    return localStorage.setItem(prefix + key, val)
}

module.exports = {
    StorageGetter,
    StorageSetter
}