import _ from 'lodash'

let prefix = 'xiao_shop_'

export function StorageGetter (key) {
    return localStorage.getItem(prefix + key)
}

export function StorageSetter (key, val) {
    return localStorage.setItem(prefix + key, val)
}

export function parseQuery(url = ''){
    return _.chain(url)
    .replace('?', '') // a=b454&c=dhjjh&f=g6hksdfjlksd
    .split('&') // ["a=b454","c=dhjjh","f=g6hksdfjlksd"]
    .map(_.partial(_.split, _, '=', 2)) // [["a","b454"],["c","dhjjh"],["f","g6hksdfjlksd"]]
    .fromPairs() // {"a":"b454","c":"dhjjh","f":"g6hksdfjlksd"}
    .value()
}

export default {
    StorageGetter,
    StorageSetter,
    parseQuery
}
