import axios from 'axios'
import router from '../..//router'
import { StorageGetter } from '../../libs/util'

axios.interceptors.request.use(
  config => {
    let token = StorageGetter('token')
    if(token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    switch(error.response && error.response.status) {
      case 401: 
        // 返回 401 清除token信息并跳转到登录页面
        router.replace({
          path: '/login'
        });

    }
    return Promise.reject(error.response.data)
  }
)
