<template>
    <div class="searchbar">
        <div class="searchbar-back" @click="$router.back()">
            <div class="iconfont icon-back searchbar-back-icon"></div>
        </div>
        <div class="searchbar-search">
            <i class="iconfont icon-search searchbar-search-icon" v-show="!searching"></i>
            <input type="text" class="searchbar-search-input" placeholder="拼手速 赢100元神券" @input="search" v-model.trim="value">
            <i class="iconfont icon-cancel searchbar-search-cancel" v-show="searching" @click="cancelSearch"></i>
        </div>
        <div class="searchbar-button">
            <div class="searchbar-button-search">搜索</div>
        </div>
        <div class="searchbar-panel" v-if="isPanel">
            <div class="searchbar-panel-item">1</div>
            <div class="searchbar-panel-item">2</div>
            <div class="searchbar-panel-item">3</div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            value: '',
            isPanel: false,
            searching: false
        }
    },
    methods: {
        search() {
            if(!this.value) {
                this.isPanel = false
                this.searching = false
                return
            }

            this.searching = true
            this.searchApi()
            this.isPanel = true
        },
        cancelSearch() {
            this.value = ''
            this.isPanel = false
            this.searching = false
        }
    }
}
</script>

<style lang="scss" scope>
    .searchbar {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        // background-image: linear-gradient(to right, rgb(249, 196, 6), rgb(243, 117, 17));
        background-color: #f2f2f2;
        &-back {
            border: 0 solid #000;
            position: relative;
            width: 49px;
            height: 28px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &-icon {
                font-size: 20px;
            }
        }
        &-search {
            position: relative;
            flex: 1 0 0%;
            height: 28px;
            border-radius: 1.5px;
            display: flex;
            flex-direction: row;
            align-content: flex-start;
            align-items: center;
            border-radius: 50px;
            background-color: rgba(255, 255, 255, 0.8);
            &-icon {
                display: flex;
                width: 13px;
                height: 16px;
                margin-left: 8px;
                font-size: 16px;
                color: #999;
            }
            &-input {
                flex: 1;
                position: relative;
                box-sizing: border-box;
                font-size: 16px;
                height: 16px;
                outline: none;
                border: none;
                background-color: transparent;
                margin-left: 10px;
            }
            &-cancel {
                margin-right: 10px;
                color: #ccc;
            }
        }
        &-button {
            border: 0 solid #000;
            position: relative;
            display: flex;
            flex-direction: column;
            width: 64px;
            height: 28px;
            align-items: center;
            justify-content: center;
            &-search {            
                background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
                width: 52px;
                height: 28px;
                line-height: 28px;
                color: #fff;
                text-align: center;
                border-radius: 14px;
                font-size: 14px;
            }
        }
        &-panel {
            position: fixed;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color:#fff;
            &-item {
                background-color: #fff;
                padding: 6px 10px;
                border-bottom: 2px solid #f2f2f2;
                position: relative;
                display: flex;
                align-items: center;
                font-size: 14px;
                &::before {
                    content: "\e65c";
                    font-family: "iconfont" !important;
                    font-size: 14px;
                    height: 14px;
                    margin-right: 10px;
                    font-weight: bold;
                    color: #ccc;
                }
            }
        }
    }
</style>