<template>
  <div class="msg_success">
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">操作成功</h2>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <router-link to="shop" class="weui-btn weui-btn_primary">添加商品</router-link>
                <router-link to="manage" class="weui-btn weui-btn_default">返回店铺</router-link>
            </p>
        </div>
    </div>
  </div>
</template>

<script>

import { createShop, shopsUpload } from "@/libs/http.js"
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
  methods: {
    async formInput() {
      this.errorMsg = null
    },
    async uploadAvatar(event) {
      let file = event.target.files[0]
      let formData = new FormData()
      formData.append('file', file, file.name)

      let { url } = await shopsUpload(formData)
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
        this.$router.push()
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
