<template>
  <div class="b-discord">
    <img class="b-discord-logo" src="@/assets/icons/discord-full.svg" alt="Discord, login for discord">
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.b-discord {
  background: #000000;
  max-width: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 20px;
  padding: 0 12px;
  cursor: pointer;
  &-logo {
    width: 100px;
    height: 40px;
  }
}
</style>
