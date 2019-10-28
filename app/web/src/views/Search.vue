<template>
  <div class="search">
      <Searchbar />
      <!-- <Searchpanel /> -->
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import Searchpanel from '@/components/Searchpanel'

export default {
  components: {
    Searchbar,
    Searchpanel
  }
}
</script>

<style>
  .search {
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
  }
</style>