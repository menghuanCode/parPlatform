<template>
  <div>
    <div class="weui-form pt-20">
      <div class="weui-cell">
        <div class="weui-cell__bd">
            <div class="weui-uploader">
                <div class="weui-uploader__bd flex-middle">
                    <!-- <ul class="weui-uploader__files" id="uploaderFiles">
                        <li class="weui-uploader__file weui-uploader__file_status">
                            <div class="weui-uploader__file-content">
                                <i class="weui-icon-warn"></i>
                            </div>
                        </li>
                        <li class="weui-uploader__file weui-uploader__file_status">
                            <div class="weui-uploader__file-content">50%</div>
                        </li>
                    </ul> -->
                    <div class="weui-uploader__input-box">
                        <input class="weui-uploader__input avatar-upload" type="file" accept="image/*" multiple="" @change="uploadAvatar">
                        <div class="shop-avatar" :style="{'backgroundImage': `url(${avatar_url})`}"></div>    
                    </div>
                </div>
                <div class="weui-form__tips-area mt-5">
                  <p class="weui-form__tips">添加店铺头像（最多5MB）</p>
                </div>
            </div>
        </div>
    </div>
    <div class="weui-form__control-area mt-0">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
            <div class="weui-cell__bd">
                <input id="js_input" class="weui-input" placeholder="店铺名称">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">地址</label></div>
            <div class="weui-cell__bd">
                <input id="js_input" class="weui-input" placeholder="店铺地址">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">联系电话</label></div>
            <div class="weui-cell__bd">
                <input id="js_input" class="weui-input" placeholder="联系电话" type="number" pattern="[0-9]*">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-form__tips-area">
      <p class="weui-form__tips">
        表单页提示，居中对齐
      </p>
    </div>
    <div class="weui-form__opr-area">
      <a class="weui-btn weui-btn_primary weui-btn_disabled" href="javascript:" id="showTooltips">确定</a>
    </div>
    <div class="weui-form__extra-area">
      <div class="weui-footer">
        <p class="weui-footer__links">
          <a href="javascript:void(0);" class="weui-footer__link">底部链接文本</a>
        </p>
        <p class="weui-footer__text">Copyright © 2008-2019 weui.io</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: "shopAddForm",
  components: {

  },
  data() {
    return {
      avatar_url: '',
    }
  },
  methods: {
    async uploadAvatar(event) {
      let file = event.target.files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      } //添加请求头
      let result = await this.$http.post('http://localhost:7002/api/upload', param, config)
      this.avatar_url = result.body.url

      console.log(this.avatar_url)
      
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
</style>
