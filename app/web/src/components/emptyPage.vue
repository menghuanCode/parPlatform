<template>
  <div class="view">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f6f6;
    color: #999;
    font-size: 16px;
  }
</style>