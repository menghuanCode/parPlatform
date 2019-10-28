<template>
  <div class="main">
    <router-view />
    <Tabbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigator from '@/components/Navigator'
import Tabbar from "@/components/Tabbar"

export default {
  name: 'Main',
  components: {
    Navigator,
    Tabbar
  }
}
</script>


<style lang="scss" scoped>
  .container {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>
