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

