<template>
    <div class="counter">
        <div class="counter-btn reduce-btn" v-show="sum" @click="$emit('change', -1)">
        <div class="iconfont icon-jian"></div>
        </div>
        <div class="counter-num" v-show="sum">{{sum}}</div>
        <div class="counter-btn add-btn" @click="$emit('change', 1)">
        <div class="iconfont icon-add"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        sum: {
            type: Number,
            required: true,
            default: 0
        }
    }
}
</script>

<style lang="scss" scope>
.counter {
  display: flex;
  align-items: center;
  justify-items: center;
  &-btn {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    border-radius: 50%;
    overflow: hidden;
    &_active {
      opacity: 0.9;
    }
  } 
  &-num {
    font-size: 16px;
    width: 81px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #000;
  }
}

.reduce-btn {
  border: 1px solid #ddd;
  color: #ddd;
}

.add-btn {
  background-color: rgb(228, 187, 126);
  color: #000;
}

.iconfont {
  font-size: 12px;
}
</style>