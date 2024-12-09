<template>
  <div class="c-services">
    <Container class="c-services-container">
      <h4 class="c-services-headline-4">{{ $t('ourPlans.title') }}</h4>
      <div class="c-services-cards">
        <ServiceCard
          v-for="list of lists"
          :list="list"
          :key="list.id"
        />
      </div>
    </Container>
  </div>
</template>

<script>
import loveSticker from '../assets/icons/love-eyes-sticker.svg'
import cumSticker from '../assets/icons/cum-sticker.svg'
import thunderSticker from '../assets/icons/thunder-sticker.svg'
import clockSticker from '../assets/icons/clock-sticker.svg'
import eyeSticker from '../assets/icons/eyes-sticker.svg'
import girlSticker from '../assets/icons/girl-sticker.svg'
import starsSticker from '../assets/icons/stars-eyes-sticker.svg'
import ServiceCard from "./ServiceCard";
import Container from "./layout-positions/Container";
export default {
  name: "OurPlans",
  components: {Container, ServiceCard},
  setup () {
    const lists = [
      {
        id: 1, title: 'ourPlans.noPlan', credits: '10', price: 'Try for free', status: 'default', oldPrice: '', plans: [
          { id: 11, icon: loveSticker, text: 'ourPlans.medQuality', premium: false },
          { id: 'empty12' },
          { id: 'empty13' },
          { id: 'empty14' },
          { id: 'empty16' },
        ]
      },
      {
        id: 2, title: 'ourPlans.basic', credits: '15', price: '€10.09/mo', status: 'default', oldPrice: '', plans: [
          { id: 12, icon: loveSticker, text: 'ourPlans.medQuality', premium: false },
          { id: 13, icon: cumSticker, text: 'ourPlans.traits', premium: false },
          { id: 14, icon: thunderSticker, text: 'ourPlans.fast', premium: false },
          { id: 'empty16' },
          { id: 'empty17' },
        ]
      },
      {
        id: 3, title: 'ourPlans.default', credits: '90', price: '€22.01/mo', status: 'default', oldPrice: '', plans: [
          { id: 15, icon: starsSticker, text: 'ourPlans.exQuality', premium: false },
          { id: 16, icon: cumSticker, text: 'ourPlans.traits', premium: false },
          { id: 17, icon: thunderSticker, text: 'ourPlans.generation', premium: false },
          { id: 18, icon: clockSticker, text: 'ourPlans.time', premium: false },
          { id: 'empty18' },
        ]
      },
      {
        id: 4, title: 'ourPlans.pro', credits: '600', price: '€44.95/mo', status: 'pro', oldPrice: '€89.90', plans: [
          { id: 19, icon: starsSticker, text: 'ourPlans.exQuality', premium: false },
          { id: 20, icon: cumSticker, text: 'ourPlans.traits', premium: false },
          { id: 21, icon: thunderSticker, text: 'ourPlans.time', premium: false },
          { id: 22, icon: eyeSticker, text: 'ourPlans.noWater', premium: false },
          { id: 23, icon: girlSticker, text: 'ourPlans.undress', premium: true },
        ]
      },
    ]
    return {
      lists
    }
  }
}
</script>

<style lang="scss">
.c-services {
  background-color: rgb(19, 19, 19);
  padding: 96px 20px;
  &-container {
    display: flex;
    flex-direction: column;
    gap: 48px;
    justify-content: space-between;
  }
  &-headline-4 {
    text-align: center;
    font-size: 48px;
    font-weight: 700;
  }
  &-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: flex-start;

    @media screen and (max-width: 1150px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      justify-items: center;
      gap: 20px 30px;
      max-width: 80%;
      margin: 0 auto;
    }
    @media screen and (max-width: 950px) {
      max-width: 95%;
      width: 100%;
    }
    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
