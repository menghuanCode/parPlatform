<template>
  <div class="page">
    <!-- <div class="view"> -->
      <!-- <navbar>店铺管理</navbar>
      <turnover :income="'0.00'" :order="0"></turnover>
      <manage></manage> -->
    <!-- </div> -->
    <!-- <div class="view" v-if="false"></div>   -->
    <emptyPage>
        <div class="weui-btn weui-btn_primary" @click="$router.push('/createShop')">立即开店</div>
    </emptyPage>  
  </div>
</template>

<script>

import { StorageGetter } from '@/libs/util.js'
import emptyPage from '@/components/emptyPage.vue'
import navbar from '@/components/navbar.vue'
import turnover from '@/components/turnover.vue'
import manage from '@/components/shopTabbar.vue'

export default {
  components: {
    navbar,
    emptyPage,
    turnover,
    manage
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

<style lang="scss" scoped>
.btn-primary {
  background-color: #845f3f;
}
</style>
