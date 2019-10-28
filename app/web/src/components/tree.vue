<template>
    <li>
        <a href="javascript:;" @click="select" class="menu-link" :class="{active: $route.path === model.path}">{{model.name}}<span class="nav-move" :class="{open}" v-if="isFolder"></span></a>
        <ul class="menu-child" v-show="open" v-if="isFolder">
           <tree class="menu-item" :model="model" v-for="(model, index) in model.children" :key="index"  />
        </ul>
    </li>
</template>

<script>


export default {
  name: 'tree',
  props: {
      model: Object
  },
  data() {
    return {
        open: false,
    }
  },
  computed: {
      isFolder: function () {
          return this.model.children && this.model.children.length
      }
  },
  methods: {
      select() {
        // 防止重复点击报错
        if(this.$route.path === this.model.path) {
            return
        }
        this.isFolder ? (this.open = !this.open) : this.$router.push(this.model.path)
      },
  }
}
</script>


<style lang="scss" scoped>
    $item_height: 45PX;

    .menu {
        &-item {
            position: relative;
            display: inline-block;
            *display: inline;
            *zoom: 1;
            display: block;
            width: 100%;
            font-size: 14px;
            &.open {
                color: #fff;
            }
        }
        &-link {
            display: block;
            padding: 0 20PX;
            transition: all .3s;
            position: relative;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: rgba(255,255,255,.7);
            line-height: $item_height;
            &:hover {
                background-color: #4E5465;
            }
            &.active {
                background-color: #009688;
                color: #fff;
            }
        }
        &-child {
            background-color: rgba(0,0,0,.3);
            .menu-link {
                padding-left: 30PX;
            }
            .menu-link:hover {
                background-color: transparent;
                color: #fff;
            }
        }
    }

    .nav-move {
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border-color: #fff transparent transparent;
        overflow: hidden;
        cursor: pointer;
        transition: all .2s;
        -webkit-transition: all .2s;
        position: absolute;
        top: 50%;
        right: 3PX;
        margin-top: -3PX;
        border-width: 6PX;
        border-top-color: rgba(255,255,255,.7);
        &.open {
            margin-top: -9PX;
            transform: rotate(180deg);
        }
    }

    .nav-move {
        right: 10PX;
    }
</style>
