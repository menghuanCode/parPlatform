<template>
    <div class="wrapper">
        <div class="wrap">
            <div class="layout-panel">
                <div class="layout" id="layout">
                    <div class="mainbox form-panel" id="login-main">
                        <div class="register-header">
                            <div class="register-title">{{ $t("register.title") }}</div>
                        </div>
                        <div class="login-area">
                            <form class="login-form" id="registerForm" method="post" autocomplete="off" @submit="registerForm">
                                <div class="pw-login">
                                    <label class="labelbox" :class="{'labelbox--error': usernameError && error}">
                                        <input class="u-input" autocomplete="off" v-model.trim="username" type="username" name="username" id="username" :placeholder="$t('register.username')">
                                    </label>
                                    <label class="labelbox" :class="{'labelbox--error': passwordError && error}">
                                        <input class="u-input" autocomplete="off" v-model.trim="password" type="password" name="password" id="password" :placeholder="$t('register.password')">
                                    </label>
                                    <label class="labelbox" :class="{'labelbox--error': surePasswordError && error}">
                                        <input class="u-input"  autocomplete="off" v-model.trim="surePassword" type="password" name="surePassword" id="surePassword" :placeholder="$t('register.surePassword')">
                                    </label>
                                </div>
                                <div class="error-tip" v-if="error">
                                    <em class="iconfont icon-error"></em>
                                    <span class="error-content">{{ msg }}</span>
                                </div>
                                <div class="login-handler">
                                    <input class="u-submit touch register-submit" id="register-button" type="submit" :value="$t('register.submit')">
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

import { createUser } from "@/libs/http.js"

export default {
  name: 'login',
  data() {
      return {
          usernameError: false,
          passwordError: false,
          surePasswordError: false,
          error: false,
          msg: '',
          username: '',
          password: '',
          surePassword: '',
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
  methods: {
      formInput(name) {
          this[name + "Error"] = false
          this.error = false
      },
      changeLanguage(lang) {
          if(this.$i18n.locale === lang.charset) {
              return;
          }

          this.$i18n.locale = lang.charset
          this.error = false
          this.showPassword = false
      },    
      async registerForm(e) {
        e.preventDefault()
        
        if(this.error) {
            return
        }

        // this.$validater({
        //     username: { type: "string", required: true, },
        //     password: { type: "string", required: true, },
        //     surePassword: { type: "number", required: true, },
        // }, this)

        if(!(this.verifyUsername() && this.verifyPassword() && this.verifySurePassword())) {
            return;
        }

        let data = {
            name: this.username,
            password: this.password
        }

        try {
            const { account } = await createUser(data)
            this.$router.replace({
                path: 'registerSuccess',
                query: { account: account }
            })
        } catch(result) {
            const { message } = result.body.error
            this.showErrorMsg('username', message)
        }

      },
      verifyUsername() {
          return this._verifyRequire('username', 'register.UsernameRequire') &&
                 this._verifySpecial('username', 'register.ErrorSepcial') 
      },
      verifyPassword() {
          return this._verifyRequire('password', 'login.EnterPassword') &&
                 this._verifySpecial('password', 'register.ErrorSepcial') &&
                 this._verifyStrong1('password', 'register.ErrorStrong1')
      },
      verifySurePassword() {
          return this._verifyRequire('surePassword', 'login.EnterSurePassword') &&
                 this._verifySame('password', 'surePassword', 'register.PasswordNoSame')
      },
      _verifyRequire(name, msg) {
          let value = this[name]
          if(!value) {
              this.showErrorMsg(name, msg)
              return
          }
          return true
      },
      _verifySpecial(name, msg) {
          let value = this[name]
          let reg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im

          if(reg.test(value)) {
              this.showErrorMsg(name, msg)
              return 
          }
          return true
      },
      _verifyStrong1(name, msg) {
          // 强度1， 字母 + 数字组合
          // 强度3为最高
        let value = this[name]
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
          if(!reg.test(value)) {
              this.showErrorMsg(name, msg)
              return 
          }
          return true
        
      },
      _verifySame(a, b, msg) {
          if(this[a] !== this[b]) {
              this.showErrorMsg(name, msg)
              return 
          }
          return true
      },
      showErrorMsg(name, msg) {
            this[name + "Error"] = true
            this.error = true
            this.msg = this.$t(msg)
      }
  },
}
</script>

<style lang="scss" scoped>
    .register { 
        &-header {
            padding: 35px 0 20px;
            text-align: center;
        }
        &-title {
            font-size: 20px;
            font-weight: normal;
            color: #000;
            letter-spacing: 2px;
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
        -webkit-box-shadow: 0px 4px 2px #f1eadf;
        -moz-box-shadow: 0px 4px 2px #f1eadf;
        box-shadow: 0px 4px 2px #f1eadf;
        border-radius: 22px;
        appearance: none;
        width: 100%;
        color: #fff;
        position: relative;
        &:active {
            background: rgba(196, 156, 99, 1);
        }
    }

    .register-submit {
        background-color: rgba(196, 156, 99, 1);
        margin-top: 15px;
        *border: 0 none;
        color: #fff;
        height: 49px;
        border-radius: 7px;
        &:active {
            background: rgba(196, 156, 99, 0.8);
        }
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


    .outer-link {
        color: #9b9b9b;
        padding: 0 9px;
        font-size: 16px;
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
