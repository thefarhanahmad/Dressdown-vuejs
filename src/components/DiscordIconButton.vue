<template>
  <div class="b-discord-icon">
    <img
      class="b-discord-icon_logo"
      src="@/assets/icons/discord-icon.svg"
      alt="Discord, login for discord"
      width="25"
      height="25"
    >
  </div>
</template>

<style scoped lang="scss">
.b-discord-icon {
  border-radius: 20px;
  border: 1px solid white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
  &_logo {
    width: 25px;
    height: 25px;
  }
}
</style>
<script setup>
</script>
