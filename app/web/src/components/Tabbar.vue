<template>
    <div class="tabbar">
        <div @click="route(item)" class="tabbar-item" :class="{active: item.to === $route.path}" v-for="(item, index) in tabbar" :key="index">
            <div class="tab-icon"><component :is="item.svg" width="22" height="22"></component></div>
            <span class="tab-text">{{item.text}}</span>
        </div>
    </div>
</template>

<script>

import { StorageGetter } from '@/libs/util.js'

import Orders from '@/assets/svg/orders.svg'
import OrdersFinder from '@/assets/svg/ordersFinder.svg'
import Shop from '@/assets/svg/shop.svg'
import My from '@/assets/svg/my.svg'

export default {
    components: {
        Orders,
        OrdersFinder,
        Shop,
        My,
    },
    data() {
        return {
            tabbar: [{
                to: '/',
                svg: 'Orders',
                text: '订单处理'
            }, {
                to: '/orders',
                svg: 'OrdersFinder',
                text: '订单查询'
            }, {
                to: '/manage',
                svg: 'Shop',
                text: '店铺'
            }, {
                to: '/my',
                svg: 'My',
                text: '我的'
            }]
        }
    },
    methods: {
        route: function (item) {
            // 防止重复点击报错
            if(this.$route.path === item.to) {
                return
            }
            // 进入我的页面必须先登录
            if(item.to === "/my" && !StorageGetter('token')) {
                this.$router.push('login')
                return
            }   

            this.$router.push(item.to)
        }
    }
}
</script>

<style lang="scss" scoped="true">
    .tabbar {
        border-top: thin solid #b0b0b0;
        height: 50px;
        width: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        &-item {
            position: relative;
            height: 100%;
            width: 25%;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            text-decoration: none;
            color: #999;
            path { // 在path改变颜色，通过fill属性
                fill: #999;
            }
            &:after {
                content: "";
                position: absolute;
                top: 0;right: 0;bottom: 0;left: 0;
            }
            &.active {
                color: #845f3f;
                path { // 在path改变颜色，通过fill属性
                  fill: #845f3f;
                }
            }
        }
    }

    .tab {
        &-icon {
            margin-top: 6px;
            max-width: 100%;
            font-size: 22px;
            height: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &-text {
            padding: 0;
            font-family: Arial,Helvetica,sans-serif;
            font-size: 13px;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>