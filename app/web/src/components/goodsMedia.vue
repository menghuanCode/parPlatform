<template>
    <div class="media">
    <div class="goods-pic media-pic">
        <img class="pic" :src="goods.pic"  />
    </div>
    <div class="media-content">
        <div class="goods-name">{{goods.name}}</div>
        <div class="goods-desc">{{goods.desc}}</div>
        <div class="goods-info">
            <div class="goods-info-l">
            <div class="pr" v-show="goods.sale">月售{{goods.sale}}</div>
            <div class="pr" v-show="goods.link">赞{{goods.like}}</div> 
            </div>
        </div>
        <div class="goods-price">¥{{goods.price}} <span class="small" v-show="goods.costPrice"><span class="del">¥{{goods.costPrice}}</span>/{{goods.spec}}</span></div>
        <counter class="goods-counter" :sum="goods.buyNumber" @change="change" />
    </div>
    </div> 
</template>

<script>

import counter from '@/components/counter'

export default {
    props: {
        goods: {
            require: true,
        }
    },
    components: {
        counter
    },
    methods: {
        change(num) {
            num > 0 ? this.$emit('add') : this.$emit('reduce')
        }
    }
}
</script>

<style lang="scss" scope>

.goods {
  &-area {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  &-pic {
    width: 160px;
    height: 160px;
  }
  &-counter {
      position: absolute;
      right: 0;
      bottom: 0;
  }
}
</style>