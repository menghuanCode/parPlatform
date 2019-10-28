class Validater {

}

export let _Vue

Validater.install = function install (Vue) {
  if(install.installed && _Vue === Vue) return

  install.installed = true
  _Vue = Vue

  const isDef = v => v !== undefined

  Vue.prototype.$validater = function (rule, data, msg) {
    if(!isDef(rule) || !isDef(data)) {
      // console.error('请输入规则和数据 validater(rule, data)')
      return
    }

    // console.log(rule, data)

    const ruleKeys = Object.keys(rule)
    for(let i = 0; i < ruleKeys.length; i++) {
      let key = ruleKeys[i]
      let item = rule[key]

      if(item.type !== null) {
        if(typeof this[key] !== item.type) {
          return {}
        }
      }
    }

  }

}

export default Validater