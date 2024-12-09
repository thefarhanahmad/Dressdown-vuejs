<template>
  <div class="p-terms">
    <Container class="p-terms_container">
      <div v-html="pageLangData[`privacy_${locale}`]">
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "../components/layout-positions/Container";
import { useI18n } from "vue-i18n";
import privacy_ae from '@/htmlLangsPages/avout_us_no.js'
import privacy_de from '@/htmlLangsPages/avout_us_de.js'
import privacy_en from '@/htmlLangsPages/avout_us_en.js'
import privacy_fr from '@/htmlLangsPages/avout_us_fr.js'
import privacy_it from '@/htmlLangsPages/avout_us_it.js'
import privacy_ja from '@/htmlLangsPages/avout_us_ja.js'
import privacy_pl from '@/htmlLangsPages/avout_us_pl.js'
import privacy_pt from '@/htmlLangsPages/about_us_pt.js'
import privacy_ru from '@/htmlLangsPages/avout_us_ru.js'
import privacy_sp from '@/htmlLangsPages/avout_us_sp.js'
import privacy_sd from '@/htmlLangsPages/avout_us_sw.js'
import privacy_tr from '@/htmlLangsPages/avout_us_tr.js'
import privacy_ua from '@/htmlLangsPages/avout_us_ua.js'
import privacy_no from '@/htmlLangsPages/avout_us_no.js'

export default {
  name: "AboutUs",
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
      privacy_no,
      privacy_ua,
    }

    return {
      pageLangData,
      locale
    }
  }
}
</script>

<style lang="scss">
.p-terms {
  &_container {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-bottom: 50px;
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
