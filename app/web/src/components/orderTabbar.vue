<template>
    <div class="tabbar">
        <div @click="route(item)" class="tabbar-item" :class="{active: item.to === active.to}" v-for="(item, index) in tabbar" :key="index">
            <span class="tab-text">{{item.text}}</span>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            active: null,
            tabbar: [{
                to: 'all',
                text: '全部'
            }, {
                to: 'ordering',
                text: '进行中'
            }, {
                to: 'ordered',
                text: '已完成'
            }, {
                to: 'unorder',
                text: '已取消/退单'
            }]
        }
    },
    watch: {
        active: function (newValue) {
            this.$emit('find', newValue.to)
        }
    },
    methods: {
        route: function (item) {
            this.active = item
        }
    },
    created() {
        this.active = this.tabbar[0]
    }
}
</script>

<style lang="scss" scoped="true">
    .tabbar {
        border-bottom: thin solid #b0b0b0;
        height: 36px;
        width: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 1;
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
            color: #000;
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