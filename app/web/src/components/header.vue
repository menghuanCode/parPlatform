<template>
<div>
    <el-menu
    :default-active="0"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item v-if="!item.children" :index="index" v-for="(item, index) in menu" :key="index">{{item.name}}</el-menu-item>
    <el-submenu v-if="item.children" :index="index" v-for="(item, index) in menu" :key="index">
      <template slot="title">{{item.name}}</template>
      <el-menu-item :index="index + '-' + cIndex"  v-for="(cItem, cIndex) in item.children" :key="cIndex">{{cItem.name}}</el-menu-item>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
</div>

</template>

<script>
  export default {
    data() {
      return {
        menu: [{
          name: '处理中心',
          link: ''
        }, {
          name: '我的工作台',
          children: [{
            name:'选项1'
          },{
            name:'选项2'
          },{
            name:'选项3'
          }]
        }]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
