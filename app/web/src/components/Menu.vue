<template>
<div class="menu">
    <el-menu
    :default-active="0"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-menu-item v-if="!item.children" :index="index" v-for="(item, index) in menu" :key="index"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
    <el-submenu v-if="item.children" :index="index" v-for="(item, index) in menu" :key="index">
      <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
      <el-menu-item :index="index + '-' + cIndex"  v-for="(cItem, cIndex) in item.children" :key="cIndex">{{cItem.name}}</el-menu-item>
    </el-submenu>
    </el-menu>
</div>

</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        menu: [{
          name: '订单处理',
          icon: 'el-icon-menu',
          link: ''
        }, {
          name: '订单查询',
          icon: 'el-icon-setting',
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
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
    .menu {
        width: 200px;
        height: 100%;
    }
    .el-menu {
        height: 100%;
    }
</style>
