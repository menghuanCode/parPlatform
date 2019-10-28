'use strict'

import Vue from 'vue'

const prefix = 'http://localhost:7002/api'

const api = {
  upload: prefix + '/upload',
  register: prefix + '/users',
  login: prefix + '/users/login'
}


export async function post(url, data, config = {}) {
  const _config = {
    headers:{'Content-Type':'application/json'}
  }
  config = Object.assign({}, _config, config)
  return await Vue.http.post(url, data, config) 
}


export async function createUser(data) {
  let { body } = await post(api.register, data)
  return body
}

export async function login(data) {
  let { body } = await post(api.login, data)
  return body 
}
