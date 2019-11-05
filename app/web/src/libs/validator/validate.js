
function format(rule) {
  const _rule = []
  let keys = Object.keys(rule)
  for(let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let item = rule[key]
    
    _rule[key] = Object.create(null)

    if(typeof item === 'string') {
      _rule[key] = { type: item, required: true, nickname: key }
      continue
    }

    let options = {
      required: true,
      nickname: key,
    }

    _rule[key] = Object.assign({}, options, item)
  }

  return _rule
}


function isTel(v) {
  return (/^1[3456789]\d{9}$/.test(v))
}

let test = {
  tel: isTel,
  required: v => !!v,
}

let message = {
  required: (n) => `${n}不能为空`,
  tel: (n) => `请输入有效的${n}`,
}


function errorHandler(key, data, nickname) {
  if(!test[key]) { return }
  let isType = test[key](data)
  if(!isType) {
    throw message[key](nickname)
  }
}


function inspect(rule, data) {
  const keys = Object.keys(rule)
  let { type, nickname } = rule
  errorHandler(type, data, nickname)
  for(let key of keys) {
    errorHandler(key, data, nickname)
  }
}

function _validate(rule, data) {
  const keys = Object.keys(rule)
  for(let key of keys) {
    try { inspect(rule[key], data[key]) } 
    catch (error) { return { key: key, value: error } }
  }

  return null
}

function validate(rule, data) {
  const _rule = format(rule)
  return _validate(_rule, data)
}

export default validate