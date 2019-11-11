<template>
  <div class="view overflow-hidden">
    <div class="area">
      <div class="weui-media-box weui-media-box_appmsg alignitem-unset">
          <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="shop.avatar_url" alt="">
          </div>
          <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{shop.name}}</h4>
              <p class="weui-media-box__desc">{{ shop.notice }}</p>
          </div>
      </div>
    </div>
    <div class="weui-flex view">
      <div class="category">
        <div v-for="(item, index) in shop.goods" :key="index" class="category-item" :class="{active: select.name === item.name}">
          {{item.name}}
        </div>
      </div>
      <div class="weui-flex__item">
        <div class="panel">
          <div v-for="(item, index) in shop.goods" :key="index">
            <div class="category-item">
              {{item.name}}
            </div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_appmsg foods alignitem-unset" v-for="(foods, findex) in item.foods" :key="findex">
                    <div class="weui-media-box__hd foods_hd">
                        <img class="weui-media-box__thumb" :src="foods.avatar_url" alt="">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="foods_name">{{foods.name}}</h4>
                        <p class="weui-media-box__desc foods_desc">{{ foods.desc }}</p>
                        <p class="foods_price">{{ foods.price }}</p>
                        <div class="counter" v-if="shopping[`${index}${findex}`]">
                          <div class="min counter-item" @click="minShopping(index, findex)">-</div>
                          <div class="num counter-item">{{ shopping[`${index}${findex}`] }}</div>
                          <div class="add counter-item" @click="addShopping(index, findex)">+</div>
                        </div>
                        <div class="counter" v-else>
                          <div class="add counter-item" @click="addShopping(index, findex)">+</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>


export default {
  name: 'WechatShop',
  components: {
  },
  data() {
    return {
      init: false,
      select: {},
      shopping: {},
      shop: {},
    }
  },
  created() {
    const { id } =  this.$route && this.$route.params
    this.main(id)
  },
  methods: {
    main(id) {
      const pageModel = this.pageModel(id)
      const pageUI = this.pageUI()
      pageModel.init(id).then(res => pageUI(res))
    },
    pageModel(id) {
      const init = () => this.$Api.getShopInfo(id)

      return {
        init
      }
    },
    pageUI() {
      let parseData = res => res.data

      let renderData = data => {
        console.log(data)
        this.shop = data
        this.select = data.goods[0]
        this.init = true
      }

      return (res) => renderData(parseData(res))
    },
    addShopping(index, findex) {
      let key = `${index}${findex}`
      if(!this.shopping[key]) {
        this.$set(this.shopping, key, 0)
      }

      this.shopping[key] += 1
    },
    minShopping(index, findex) {
      let key = `${index}${findex}`
      if(!this.shopping[key]) {
        delete this.shopping[key]
        return
      }

      this.shopping[key] -= 1
    }
  },
}
</script>

<style lang="scss" scoped>
  .area {
    width: 100%;
    background-color: #fff;
    margin-bottom: 8px;
    padding: 0; 
  }

  .category {
    width: 81px;
    text-align: center;
    text-align: center;
    &-item {
      padding: 8px 10px;
      font-size: 13px;
      &.active {
        color: #000;
        background-color: #fff;
        font-weight: bold;
      }
    }
  }
  .panel {
    background-color: #fff;
  }
  .foods {
    position: relative;
    padding: 5px 10px;
    &_hd {
      margin-right: 8px;
      background-color: #ccc;
    }
    &_name {
      font-size: 13px;
    }
    &_desc {
      font-size: 12px;
    }
    &_price {
      font-size: 14px;
      color: red;
    }
  }

  .alignitem-unset {
    -webkit-box-align: unset;
    -webkit-align-items: unset;
    align-items: unset;
  }

  .counter {
    display: flex;
    position: absolute;
    right: 10px;
    bottom: 10px;
    &-item {
      width: 20px;
      height: 20px;
      font-size: 20px;
      line-height: 18px;
      text-align: center;
      padding: 0;
      &.add,&.min {
        background-color: #E4BB7E;
        border-radius: 50%;
        &.disable {
          background-color: #f2f2f2;
          opacity: 0.5;
        }
      }
      &.num {
        font-size: 16px;
        width: 36px;
      }
    }

  }

  .overflow {
    &-hidden {
      overflow: hidden;
    }
    &-scroll {
      overflow: scroll;
    }
  }

</style>
