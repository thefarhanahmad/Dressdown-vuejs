<template>
  <div class="c-advantage">
    <div class="c-advantage_numbers">
      <h3 class="c-advantage_numbers-headline-3">
        {{ $t($props.mainTitle) }}
      </h3>
      <p class="c-advantage_numbers-description">
        {{ $t($props.description) }}
      </p>
    </div>
    <div class="c-advantage_icon">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvantageCard",
  props: {
    mainTitle: String,
    description: String
  }
}
</script>

<style lang="scss">
.c-advantage {
  width: 350px;
  height: 150px;
  padding: 28px 24px 28px 32px;
  //background-color: #ffffff14;
  background: rgba(173, 240, 28, 0.12);
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 1100px) {
    width: 257px;
    height: 160px;
    padding: 28px 20px;
  }
  @media screen and (max-width: 825px) {
    width: 100%;
    height: 130px;
  }
  &_numbers {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 75%;

    @media screen and (max-width: 1100px) {
      width: 90%;
    }

    &-headline-3 {
      font-size: 20px;
      font-weight: 700;
      @media screen and (max-width: 1100px) {
        font-size: 18px;
      }
    }
    &-description {
      font-size: 16px;
      color: #ffffff80;
      @media screen and (max-width: 1100px) {
        font-size: 14px;
      }
    }
  }
  &_icon {
    width: 64px;
    height: 64px;
    background: #ffffff1f;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1100px) {
      width: 48px;
      height: 48px;
    }
    img {
      width: 36px;
      height: 100%;
      @media screen and (max-width: 1100px) {
        width: 24px;
      }
    }
  }
}
</style>
