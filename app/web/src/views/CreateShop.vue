<template>
  <div>
    <div class="weui-form pt-20">
      <div class="weui-cell">
        <div class="weui-cell__bd">
            <div class="weui-uploader">
                <div class="weui-uploader__bd flex-middle">
                    <div class="weui-uploader__input-box">
                        <input class="weui-uploader__input avatar-upload" type="file" accept="image/*" multiple="" @change="uploadAvatar">
                        <div class="shop-avatar" :style="{'backgroundImage': `url(${form.avatar_url})`}"></div>    
                    </div>
                </div>
                <div class="weui-form__tips-area mt-5">
                  <p class="weui-form__tips">添加店铺头像（最多5MB）</p>
                </div>
            </div>
        </div>
    </div>
    <div class="weui-form__control-area mt-0 mb-0">
      <div class="weui-cells__group weui-cells__group_form">
        <!-- <div class="weui-cells__title">基本信息</div> -->
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
            <div class="weui-cell__bd">
                <input name="name" v-model.trim="form.name" class="weui-input" @input="formInput" placeholder="店铺名称">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">地址</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" @input="formInput" v-model.trim="form.address" placeholder="店铺地址">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">联系电话</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" @input="formInput" v-model.trim="form.phone"  placeholder="联系电话" type="number" pattern="[0-9]*">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-form__tips-area">
      <p class="weui-form__tips errorMsg">
        {{ errorMsg && errorMsg.value  }}
      </p>
    </div>
    <div class="weui-form__opr-area">
      <a class="weui-btn weui-btn_primary"  @click="submit">确定</a>
    </div>
  </div>
  </div>
</template>

<script>

import { createShop, shopUpload } from "@/libs/http.js"
import { stat } from 'fs';


export default {
  name: "shopAddForm",
  components: {

  },
  data() {
    return {
      errorMsg: null,
      form: {
        avatar_url: '',
        name: '',
        address: '',
        phone: '',
      }
    }
  },
  created() {
  },
  methods: { 
    async formInput() {
      this.errorMsg = null
    },
    async uploadAvatar(event) {
      let file = event.target.files[0]
      let formData = new FormData()
      formData.append('file', file, file.name)

      let { url } = await shopUpload(formData)
      this.form.avatar_url = url

    },
    async submit() {
      let errorMsg = this.$validate({
        avatar_url: { nickname: '头像' },
        name: { nickname: '名称' },
        address: { nickname: '地址' },
        phone: { type: 'tel', nickname: '联系电话' }
      }, this.form)

     if(errorMsg) {
       this.errorMsg = errorMsg
       return
     }

      let res = await createShop(this.form)
      if(res.status === 200) {
        this.$router.repleace({
          path: '/manage'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .flex-middle {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pt {
    &-0 {
      padding-top: 0 !important;
    }
    &-20 {
      padding-top: 20px !important;
    }
  }

  .mt {
    &-0 {
      margin-top: 0px !important;
    }
    &-5 {
      margin-top: 5px !important;
    }
  }

  .mb {
    &-0 {
      margin-bottom: 0 !important;
    }
  }

  .avatar-upload {
    z-index: 2;
  }

  .shop-avatar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    z-index: 1;
  }

  .errorMsg {
    color: red;
    text-align: left;
    padding: 0 30px;
    ::placeholder {
      color: red !important;
    }
  }
</style>
