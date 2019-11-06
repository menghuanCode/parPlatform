<template>
    <div class="wrapper">
        <div class="wrap">
            <div class="layout-panel">
                <div class="layout" id="layout">
                    <div class="mainbox form-panel" id="login-main">
                        <div class="login-header">
                            <div class="login-title">{{ $t("login.title") }}</div>
                        </div>
                        <div class="login-area">
                            <form class="login-form" id="loginForm" method="post" autocomplete="off" @submit="loginForm">
                                <div class="pw-login">
                                    <label for="account" class="labelbox" :class="{'labelbox--error': accountError && error}">
                                        <input class="u-input" @input="formInput('account')" autocomplete="off" v-model.trim="account" type="text" name="account" id="account" :placeholder="$t('login.account')">
                                        <i class="iconfont icon-cancel" v-show="!!account.length" @click="cancelInput('account')"></i>
                                    </label>
                                    <label class="labelbox" :class="{'labelbox--error': passwordError && error}">
                                        <input class="u-input" @input="formInput('password')" v-if="showPassword" autocomplete="off" v-model.trim="password" type="text" name="password" id="password" :placeholder="$t('login.password')">
                                        <input class="u-input" @input="formInput('password')"  v-else autocomplete="off" v-model.trim="password" type="password" name="password" id="password" :placeholder="$t('login.password')">
                                        <i class="iconfont icon-yanjing" :class="{active: showPassword}" @click="showPasswordFn"></i>
                                    </label>
                                </div>
                                <div class="error-tip" v-if="error">
                                    <em class="iconfont icon-error"></em>
                                    <span class="error-content">{{ msg }}</span>
                                </div>
                                <div class="login-handler">
                                    <input class="u-submit login-btn" id="login-button" type="submit" :value="$t('login.submit')">
                                </div>
                                <div class="reverse">
                                    <router-link to="register" class="outer-link">{{$t('login.register')}}</router-link>
                                    <span>|</span>
                                    <a href="javascript:;" class="outer-link">{{$t('login.forgetPossword')}}?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>   
        </div>   
        <div class="n-footer" id="footer">
            <ul class="lang-list">
                <li @click="changeLanguage(lang)" v-for="(lang, index) in langs" :key="index">
                    <a href="javascript:;" class="lang-link" :class="{current: $i18n.locale === lang.charset}">{{lang.text}}</a>|
                </li>
                <li><a href="javascript:;" class="lang-link">{{$t('login.FAQ')}}</a>|</li>
                <li><a href="javascript:;" class="lang-link">{{$t('login.PrivacyPolicy')}}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>


import { login } from "@/libs/http.js"

import { StorageSetter, parseUrl } from "@/libs/util.js"
import { decode } from 'punycode';

export default {
  name: 'login',
  data() {
      return {
          back: '',
          accountError: false,
          passwordError: false,
          error: false,
          msg: '',
          phone: '',
          password: '',
          account: '',
          smsCode: '',
          showPassword: false,
          langs: [{
              charset: 'zh',
              text: '简体'
          },{
              charset: 'ft',
              text: '繁体'
          },{
              charset: 'en',
              text: 'Englist'
          }]
      }
  },
  created() {
    if(location.search) {
        let result = parseUrl(location.href)
        this.redirect = decodeURIComponent(result.redirect)
    }
  },
  methods: {
      formInput(name) {
          this[name + "Error"] = false
          this.error = false
      },
      cancelInput(prototype) {
          this[prototype] = ""
      },
      showPasswordFn() {
          this.showPassword = !this.showPassword 
      },
      changeLanguage(lang) {
          if(this.$i18n.locale === lang.charset) {
              return;
          }

          this.$i18n.locale = lang.charset
          this.error = false
          this.showPassword = false
      },    
      async loginForm(e) {
        e.preventDefault()

        if(this.error) {
            return
        }

        if(!(this.verifyaccount() && this.verifyPassword())) {
            return;
        }

        let data = {
            account: this.account,
            password: this.password
        }

        let that = this

        try {
            const token = await login(data)
            StorageSetter('token', token)
            that.$router.push(this.back || '/')
        } catch(error) {
            console.log(error)
            let { message } = error 
            this.showErrorMsg(null, message)
        }

      },
      verifyaccount() {
          let account = this.account
          if(!account) {
            this.accountError = true
            this.error = true
            this.msg = this.$t("login.EnterAccount")
              return
          } 
          return true
      },
      verifyPassword() {
          let password = this.password
          if(!password) {
            this.passwordError = true
            this.error = true
            this.msg = this.$t("login.EnterPassword")
              return
          } 
          return true
      },
      showErrorMsg(name, msg) {
        if(name !== null) {
            this[name + "Error"] = true
        }
        this.error = true
        this.msg = this.$t(msg)
      }
  }
}
</script>

<style lang="scss" scoped>

    .wrapper {
        background-image: url('../assets/images/bg-01.png');
        background-repeat: no-repeat;
        background-size: 100% auto;
    }

    .layout {
        padding: 0 46px;
    }
    

    .login { 
        &-header {
            padding: 60px 0 10px;
            text-align: center;
        }
        &-title {
            font-size: 24px;
            margin: 16px 0;
            color: #666;
            font-weight: normal;
        }
        &-area {
            padding-bottom: 20px;
            max-width: 640px;
            margin: 0 auto;
        }
    }

    .labelbox {
        border-bottom: 1px solid #d3d3d3;
        background: none;
        display: box;
        display: -webkit-box;
        display: -moz-box;
        -webkit-box-align: center;
        box-align: center;
        &--error {
            border-bottom-color: #bf1111;
        }
    }

    .u-input {
        padding: 20px 0 16px 0;
        flex-grow: 1;
        width: 100%;
        line-height: normal;
        display: block;
        font-size: 18px;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        box-flex: 1;
        background-color: transparent;
        outline: none;
    }

    .u-sms {
        padding-left: 20px;
        display: block;
        color: #C49C63;
        font-size: 14px;
    }

    .u-submit {
        padding: 6px 0;
        font-size: 16px;
        border-radius: 22px;
        appearance: none;
        width: 100%;
        color: #fff;
        position: relative;
        &:active {
            background: rgba(196, 156, 99, 1);
        }
    }

    .login-btn {
        background: -webkit-linear-gradient(left, #E4BB7E, #D1A96E );
        background: -o-linear-gradient(right, #E4BB7E, #D1A96E );
        background: -moz-linear-gradient(right, #E4BB7E, #D1A96E );
        background: linear-gradient(to right, #E4BB7E, #D1A96E );
        -webkit-box-shadow: 0px 4px 2px #f1eadf;
        -moz-box-shadow: 0px 4px 2px #f1eadf;
        box-shadow: 0px 4px 2px #f1eadf;
        height: 33px;
    }

    .error-tip {
        margin-bottom: 5px;
        line-height: 20px;
        color: #bf1111;
        padding-top: 14px;
        display: flex;
        align-items: center;
    }

    .icon-error {
        color: #bf1111;
        font-size: 16px;
        padding-right: 4px;
    }

    .icon-cancel {
        font-size: 20px;
        color: rgba(0,0,0,0.3);
    }

    
    .icon-yanjing {
        font-size: 20px;
        padding-right: 4px;
        &.active {
            color: #C49C63;
        }
    }

    .error-content {
        font-size: 14px;
    }

    .login-handler {
        padding-top: 24px;
    }

    .toggle-type {
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 14px;
        border: none;
        text-align: left;
        padding-left: 5px;
        color: #666;
    }

    .reverse {
        padding-top: 20px;
        display: box;
        display: -webkit-box;
        display: -moz-box;
        -webkit-box-orient: vertical;
        box-orient: vertical;
        -webkit-box-direction: reverse;
        box-direction: reverse;
        text-align: center;
        font-size: 16px;
    }

    .outer-link {
        color: #9b9b9b;
        padding: 0 9px;
        font-size: 15px;
    }

    .n-footer {
        line-height: 1.5;
        text-align: center;
        font-size: 14px;
        height: 16px;
        width: 100%;
    }

    .lang-list {
        display: flex;
        justify-content: center;
    }
    .lang-link {
        padding: 0 10px;
        color: #9b9b9b;
        font-size: 14px;
        &.current {
            color: #f7b24f;
        }
    }

    a:active {
        color: #f7b24f;
    }

    
</style>
