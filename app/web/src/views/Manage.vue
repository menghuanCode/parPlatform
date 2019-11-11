<template>
  <div class="page">
    <div class="view">
      <navbar>店铺管理</navbar>
      <turnover :income="'0.00'" :order="0"></turnover>
      <manage id="5dc858adb1f7164260ec084b"></manage>
    </div>
    <!-- <div class="view" v-if="false"></div>   -->
    <!-- <emptyPage>
    </emptyPage>   -->
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
      shop: {},
    }
  },
  created() {
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
