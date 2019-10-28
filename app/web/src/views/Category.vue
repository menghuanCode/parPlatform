<template>
  <div class="Category">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'Category',
  components: {
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
