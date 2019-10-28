<template>
  <div class="navigator">
      <div class="navigator-logo">晓</div>
      <router-link to="search" class="navigator-search">
          <i class="iconfont icon-search navigator-search-icon"></i>
          <span class="navigator-search-text">拼手速 赢100元神券</span>
      </router-link>
      <div class="navigator-message">
          <span class="iconfont icon-message navigator-message-icon"></span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scope>
    .navigator {
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
        background-color: #e5a31c;
        &-logo {
            border: 0 solid #000;
            position: relative;
            width: 64px;
            height: 28px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
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
            &-text {
                flex: 1;
                border: 0 solid #000;
                position: relative;
                box-sizing: border-box;
                -webkit-box-orient: vertical;
                flex-direction: column;
                align-content: flex-start;
                flex-shrink: 0;
                font-size: 13px;
                margin-left: 8px;
                margin-right: 8px;
                height: 16px;
                color: #999;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        &-message {
            border: 0 solid #000;
            position: relative;
            display: flex;
            flex-direction: column;
            width: 40px;
            height: 28px;
            align-items: center;
            justify-content: center;
            &-icon {
                font-size: 20px;
                color: #fff;
            }
        }
    }
</style>