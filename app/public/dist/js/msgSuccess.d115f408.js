(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["msgSuccess"],{"00e3":function(t,e,n){},"2b09":function(t,e,n){"use strict";var r=n("00e3"),a=n.n(r);a.a},"3e8f":function(t,e){},"7f7f":function(t,e,n){var r=n("86cc").f,a=Function.prototype,s=/^\s*function ([^ (]*)/,i="name";i in a||n("9e1e")&&r(a,i,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},ca06:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"msg_success"},[n("div",{staticClass:"weui-msg"},[t._m(0),t._m(1),n("div",{staticClass:"weui-msg__opr-area"},[n("p",{staticClass:"weui-btn-area"},[n("router-link",{staticClass:"weui-btn weui-btn_primary",attrs:{to:"shop"}},[t._v("添加商品")]),n("router-link",{staticClass:"weui-btn weui-btn_default",attrs:{to:"manage"}},[t._v("返回店铺")])],1)])])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-msg__icon-area"},[n("i",{staticClass:"weui-icon-success weui-icon_msg"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-msg__text-area"},[n("h2",{staticClass:"weui-msg__title"},[t._v("操作成功")])])}],s=(n("7f7f"),n("96cf"),n("3b8d")),i=n("b1d0"),u=(n("3e8f"),{name:"shopAddForm",components:{},data:function(){return{errorMsg:null,form:{avatar_url:"",name:"",address:"",phone:""}}},methods:{formInput:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.errorMsg=null;case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),uploadAvatar:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var n,r,a,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.target.files[0],r=new FormData,r.append("file",n,n.name),t.next=5,Object(i["shopsUpload"])(r);case 5:a=t.sent,s=a.url,this.form.avatar_url=s;case 8:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),submit:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=this.$validate({avatar_url:{nickname:"头像"},name:{nickname:"名称"},address:{nickname:"地址"},phone:{type:"tel",nickname:"联系电话"}},this.form),!e){t.next=4;break}return this.errorMsg=e,t.abrupt("return");case 4:return t.next=6,Object(i["a"])(this.form);case 6:n=t.sent,200===n.status&&this.$router.push();case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}}),c=u,o=(n("2b09"),n("2877")),f=Object(o["a"])(c,r,a,!1,null,"0b02f5fc",null);e["default"]=f.exports}}]);
//# sourceMappingURL=msgSuccess.d115f408.js.map