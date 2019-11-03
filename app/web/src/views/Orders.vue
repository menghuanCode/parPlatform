<template>
  <div class="page">
    <tabbar @find="getOrders" />
    <div class="view" v-if="false"></div>  
    <emptyPage v-else>暂无订单</emptyPage>  
  </div>
</template>

<script>

import { StorageGetter } from '@/libs/util.js'
import tabbar from '@/components/orderTabbar.vue'
import emptyPage from '@/components/emptyPage.vue'

export default {
  components: {
    tabbar,
    emptyPage
  },
  data() {
    return {

    }
  },
  methods: {
    getOrders(params) {
      console.log('orders', params)
    }
  }
}
</script>
