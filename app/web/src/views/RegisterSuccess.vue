<template>
    <div class="wrapper">
        <div class="wrap">
            <div class="layout-panel">
                <div class="layout" id="layout">
                    <div class="message">
                        <div class="message-icon"><i class="iconfont icon-success"></i></div>
                        <div class="message-title">注册成功</div>
                        <div class="message-content">你的账号是：<span class="account_number">{{ $route.query.account }}</span></div>
                        <div class="login-button" @click="routerLogin">立即登录</div>
                    </div>
                </div>
            </div>   
        </div>   
    </div>
</template>

<script>

export default {
  name: 'RegisterSuccess',
  data() {
      return {
      }
  },
  methods: {
      routerLogin() {
          this.$router.push('/login')
      }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

    .message {
        width:100%;
        padding: 20px 15px;
        margin: 30px auto;
        &-icon {
            text-align: center;
            margin-bottom: 20px;
        }
        &-title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 8px;
        }
        &-content {
            text-align: center;
            font-size: 18px;
            margin-bottom: 60px;
        }
    }

    .icon-success {
        font-size: 64px;
        color: green;
    }

    .account_number {
        color: #e5a31c;
    }

    .login-button {
        padding: 6px 0;
        -webkit-box-shadow: 0px 4px 2px #f1eadf;
        -moz-box-shadow: 0px 4px 2px #f1eadf;
        box-shadow: 0px 4px 2px #f1eadf;
        border-radius: 22px;
        appearance: none;
        width: 100%;
        color: #fff;
        position: relative;
        text-align: center;
        background-color: rgba(196, 156, 99, 1);
        margin-top: 15px;
        *border: 0 none;
        color: #fff;
        height: 46px;
        font-size: 16px;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
            background-color: rgba(196, 156, 99, 0.9);
        }
        
    }
    
</style>
