<template>
  <div class="p-privacy p-privacy-policy">
    <Container class="p-privacy_container">
    <div v-html="pageLangData[`privacy_${locale}`]">
    </div>
    </Container>
  </div>
</template>

<script>
import Container from "../components/layout-positions/Container";
import { useI18n } from "vue-i18n";
import privacy_ae from '@/htmlLangsPages/privacy_policy_ae.js'
import privacy_de from '@/htmlLangsPages/privacy_policy_de.js'
import privacy_en from '@/htmlLangsPages/privacy_policy_en.js'
import privacy_fr from '@/htmlLangsPages/privacy_policy_fr.js'
import privacy_it from '@/htmlLangsPages/privacy_policy_it.js'
import privacy_ja from '@/htmlLangsPages/privacy_policy_ja.js'
import privacy_pl from '@/htmlLangsPages/privacy_policy_pl.js'
import privacy_pt from '@/htmlLangsPages/privacy_policy_pt.js'
import privacy_ru from '@/htmlLangsPages/privacy_policy_ru.js'
import privacy_sp from '@/htmlLangsPages/privacy_policy_sp.js'
import privacy_sd from '@/htmlLangsPages/privacy_policy_sw.js'
import privacy_tr from '@/htmlLangsPages/privacy_policy_tr.js'
import privacy_ua from '@/htmlLangsPages/privacy_policy_ua.js'
import privacy_no from '@/htmlLangsPages/privacy_policy_no.js'

export default {
  name: "Privacy",
  components: {
    Container
  },
  setup () {
    const { locale } = useI18n()
    const pageLangData = {
      privacy_ae,
      privacy_de,
      privacy_en,
      privacy_fr,
      privacy_it,
      privacy_ja,
      privacy_pl,
      privacy_pt,
      privacy_ru,
      privacy_sp,
      privacy_sd,
      privacy_tr,
      privacy_ua,
      privacy_no,
    }

    return {
      pageLangData,
      locale
    }
  }
}
</script>

<style lang="scss">
.p-privacy {
  &_container {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-bottom: 50px;
    max-width: 97%;
    margin: 0 auto;
  }

  &-policy {
    h5, h2, h3 {
      margin-bottom: 10px;
      font-size: 28px;
      font-weight: 600;
      margin-top: 10px;
    }
  }

  h5, h2, h3 {
    margin-bottom: 10px;
    font-size: 28px;
    font-weight: 600;
  }

  p {
    font-size: 18px;
    line-height: 1.5;
  }

  h6 {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 600;
  }
  li {
    margin: 10px 0;
  }
  ul {
    padding-left: 15px;
  }
}
</style>
