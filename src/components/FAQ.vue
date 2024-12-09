<template>
  <div class="c-faq">
    <Container>
      <div class="c-faq-wrapper">
        <h2 class="c-faq-wrapper-title">
          FAQ
        </h2>
        <div class="c-faq-wrapper-accordion">
          <AccordionElement
            v-for="item of items"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "./layout-positions/Container";
import AccordionElement from "./AccordionElement";
export default {
  name: "FAQ",
  components: {
    AccordionElement,
    Container
  },
  setup() {
    const items = [
      { id: 1, title: 'faq.linkTitle1', desc: 'faq.linkDesc1' },
      { id: 2, title: 'faq.linkTitle2', desc: 'faq.linkDesc2' },
      { id: 3, title: 'faq.linkTitle3', desc: 'faq.linkDesc3' },
      { id: 4, title: 'faq.linkTitle4', desc: 'faq.linkDesc4' },
    ]
    return {
      items
    }
  }
}
</script>

<style lang="scss">
.c-faq {
  background: rgb(20, 20, 20);
  padding: 20px 20px 64px;
  &-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 60px;
    @media screen and (max-width: 550px) {
      flex-direction: column;
      align-items: center;
    }
    &-title {
      font-size: 36px;
      font-weight: 700;
      padding-bottom: 24px;
      padding-top: 16px;
      text-align: start;
    }
    &-accordion {
      display: flex;
      flex-direction: column;
      max-width: 800px;
      gap: 24px;
    }
  }
}
</style>
