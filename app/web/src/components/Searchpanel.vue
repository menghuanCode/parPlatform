<template>
  <div class="searchpanel">
      <div class="searchpanel-back">
          <div class="iconfont icon-back searchpanel-back-icon"></div>
      </div>
      <div class="searchpanel-search">
          <i class="iconfont icon-search searchpanel-search-icon"></i>
          <input type="text" class="searchpanel-search-input" placeholder="拼手速 赢100元神券">
      </div>
      <div class="searchpanel-button">
          <div class="searchpanel-button-search">搜索</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Searchpanel'
}
</script>

<style lang="scss" scope>
    .searchpanel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        // background-image: linear-gradient(to right, rgb(249, 196, 6), rgb(243, 117, 17));
        background-color: #f2f2f2;
        &-back {
            border: 0 solid #000;
            position: relative;
            width: 49px;
            height: 28px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &-icon {
                font-size: 20px;
            }
        }
        &-search {
            position: relative;
            flex: 1 0 0%;
            height: 28px;
            border-radius: 1.5px;
            display: flex;
            flex-direction: row;
            align-content: flex-start;
            align-items: center;
            border-radius: 50px;
            background-color: rgba(255, 255, 255, 0.8);
            &-icon {
                display: flex;
                width: 13px;
                height: 16px;
                margin-left: 10px;
                font-size: 16px;
                color: #999;
            }
            &-input {
                flex: 1;
                position: relative;
                box-sizing: border-box;
                font-size: 14px;
                outline: none;
                border: none;
                background-color: transparent;
                margin-left: 12px;
            }
        }
        &-button {
            border: 0 solid #000;
            position: relative;
            display: flex;
            flex-direction: column;
            width: 64px;
            height: 28px;
            align-items: center;
            justify-content: center;
            &-search {            
                background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
                width: 52px;
                height: 28px;
                line-height: 28px;
                color: #fff;
                text-align: center;
                border-radius: 14px;
                font-size: 14px;
            }
        }
    }
</style>