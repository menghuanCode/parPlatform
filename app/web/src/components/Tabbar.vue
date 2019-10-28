<template>
    <div class="tabbar">
        <div @click="route(item)" class="tabbar-item" :class="{active: item.to === $route.path}" v-for="(item, index) in tabbar" :key="index">
            <i class="tab-icon iconfont" :class="[item.icon]"></i>
            <span class="tab-text">{{item.text}}</span>
        </div>
    </div>
</template>

<script>

import { StorageGetter } from '@/libs/util.js'

export default {
    data() {
        return {
            tabbar: [{
                to: '/',
                icon: 'icon-order',
                text: '订单处理'
            }, {
                to: '/orders',
                icon: 'icon-orders',
                text: '订单查询'
            }, {
                to: '/shop',
                icon: 'icon-mendian',
                text: '管理'
            }, {
                to: '/set',
                icon: 'icon-set',
                text: '设置'
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

<style lang="scss">
    .tabbar {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
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
            &:after {
                content: "";
                position: absolute;
                top: 0;right: 0;bottom: 0;left: 0;
            }
            &.active {
                color: #845f3f;
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
            display: inline-block;
            margin-top: 4px;
            padding: 0;
            font-family: Arial,Helvetica,sans-serif;
            font-size: 12px;
            line-height: 14.4px;
        }
    }

    .icon {
        &-order {
            font-size: 22px;
        }
        &-orders {
            font-size: 36px;
        }
    }
</style>