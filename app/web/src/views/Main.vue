<template>
  <div class="main">
    <div class="container">
      <router-view />
    </div>    
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
