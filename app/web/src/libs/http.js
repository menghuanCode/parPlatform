'use strict'
import axios from 'axios'

const root = 'http://localhost:7001/api'

const api = {
  login: `${root}/users/login`,
  shop: `${root}/shops`,
  shopUpload: `${root}/shops/upload`,
}

export async function login(data) {
  let res = await axios.post(api.login, data)
  return res.data.token
}

export async function shopUpload(formData) {
  let { data } = await upload(api.shopUpload, formData)
  return data
}

export async function createShop(data) {
  let res = await axios.post(api.shop, data)
  return res
}

export async function getShopInfo(id) {
  let res = await axios.get(api.shop + '/' + id)
  return res
}

async function upload(url, formData) {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  return await axios.post(url, formData, config)
}

const Api = {
  login,
  shopUpload,
  createShop,
  getShopInfo,
  upload
}

export default Api


// import Vue from 'vue'
// import { StorageGetter } from './util'

// const prefix = 'http://localhost:7001/api'

// const api = {
//   register: prefix + '/users',
//   login: prefix + '/users/login',
//   shops: prefix + '/shops',
// }

// export async function post(url, data, config = {}) {
//   const _config = {
//     headers:{'Content-Type':'application/json'}
//   }
//   config = Object.assign({}, _config, config)

//   return await Vue.http.post(url, data, config)
// }



// export async function createUser(data) {
//   let { body } = await post(api.register, data)
//   return body
// }

// export async function login(data) {
//   let { body } = await post(api.login, data)
//   return body 
// }

// export async function shopsUpload(formData) {
//   return await upload(api.shops + '/upload', formData)
// }

// export async function createShop(data) {
//   let result = await post(api.shops, data)
//   return result
// }

// async function upload(url, formData) {
//   let token = StorageGetter('token')
//   let config = {
//     headers:{
//       'Content-Type':'multipart/form-data',
//       'Authorization': 'Bearer ' + token
//     }
//   }

//   let { body } = await post(url, formData, config)
//   return body 
// }