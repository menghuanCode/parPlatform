import validate from './validate'

class Validator {
  
}

export let _Vue

Validator.install = function install (Vue) {
  if(install.installed && _Vue === Vue) return

  install.installed = true
  _Vue = Vue

  Vue.prototype.$validate = validate
}


export default Validator