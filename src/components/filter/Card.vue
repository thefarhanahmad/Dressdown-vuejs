<template>
  <div
    class="generation_filters-option_item"
    :key="item.id"
    :class="{'generation_filters-option_item--active': item.id === activeItem}"
  >
    <img
      class="generation_filters-option_item-description-image"
      :src="item.img"
      alt="Body type of girl"
      draggable="false"
    >
    <span class="generation_filters-option_item-description">
      {{ item.title }}
    </span>
<!--    <div v-show="item.premium" class="generation_filters-option_item-vip">-->
<!--      <img-->
<!--        class="generation_filters-option_item-vip-icon"-->
<!--        src="@/assets/icons/crown.svg"-->
<!--        alt="premium vip content"-->
<!--        draggable="false"-->
<!--      />-->
<!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      item: {},
      activeItem: {}
    },
    setup(props) {
      return {

      }
    }
  }
</script>

<style lang="scss">

</style>
