<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Container"
}
</script>

<style lang="scss">
.container {
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
}
</style>
