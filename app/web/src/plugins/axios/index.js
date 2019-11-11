import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Api from './api'

import './interceptors'

Vue.prototype.$Api = Api
Vue.use(VueAxios,axios)