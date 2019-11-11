<template>
    <div class="tababr weui-flex">
      <router-link :to="`/shops/${id}`"  class="tababr-item weui-flex__item">
        <div class="tababr-icon"><food width="26" height="26" /></div>
        <div class="tababr-text">商品</div>
      </router-link>
      <div class="tababr-item weui-flex__item">
        <div class="tababr-icon"><wallet width="26" height="26" /></div>
        <div class="tababr-text">钱包</div>
      </div>
      <router-link :to="`/wechat/shop/${id}`" class="tababr-item weui-flex__item">
        <div class="tababr-icon"><shop width="26" height="26" /></div>
        <div class="tababr-text">店铺</div>
      </router-link>
    </div>
</template>

<script>

import food from '@/assets/svg/food.svg'
import wallet from '@/assets/svg/wallet.svg'
import shop from '@/assets/svg/shop2.svg'

export default {
  props: {
    id: '',
  },
  components: {
    food,
    wallet,
    shop
  },
}
</script>


<style lang="scss" scoped>
.tababr {
  background-color: #fff;
  margin: 20px 10px;
  &-item {
    text-align: center;
    padding: 20px 15px;
    path { // 在path改变颜色，通过fill属性
      fill: #148c6b;
    }
  }
  &-text {
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
 