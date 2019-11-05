<template>
    <div class="turnover weui-flex">
      <div class="turnover-item weui-flex__item">
        <div class="turnover-number">{{income}}</div>
        <div class="turnover-text">今日预计收入</div>
      </div>
      <div class="turnover-item weui-flex__item">
        <div class="turnover-number">{{order}}</div>
        <div class="turnover-text">有效订单</div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    income: {
      type: [String, Number],
      default: "0.00"
    },
    order: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>


<style lang="scss" scoped>
.turnover {
  width: 100%;
  color: #fff;
  background-color: #25b58d; 
  margin-top: -1px;
  &-item {
    text-align: center;
    padding: 15px;
    padding-bottom: 30px;
  }
  &-number {
    font-size: 20px;
  }
  &-text {
    font-size: 12px;
    line-height: 12px;
    color: #f2f2f2;
  }
}
</style>
