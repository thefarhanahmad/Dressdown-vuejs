<template>
  <div class="generation_filters" :class="{'generation_filters--active': isOpenFilters}">
    <div class="generation_filters-holder">
      <div class="generation_filters-holder_head">
        <h1 class="generation_filters-profile">Settings</h1>
        <img
          @click="closeFilter"
          class="generation_filters-holder_head-icon"
          src="../../assets/icons/close.svg"
          alt="close close-filters"
        />
      </div>
      <div class="generation_filters-option">
        <h4 class="generation_filters-title">
          {{ $t('filters.type') }}
        </h4>
        <div class="generation_filters-option-wrapper">
          <Card
            @click="activeGenerationType = item.id"
            :active-item="activeGenerationType"
            v-for="item of [ undressType, posesType ]"
            :key="item.id + 'categories'"
            :item="item"
          />
        </div>
      </div>
      <div v-show="activeGenerationType === 1">
        <!--   Type for undressing in different suits     -->
        <div class="generation_filters-pagination">
          <div class="generation_filters-pagination-arrow generation_filters-pagination_left swiper-button-prev"></div>
          <div class="generation_filters-pagination-arrow generation_filters-pagination_right swiper-button-next"></div>
        </div>
        <Swiper
          :modules="modules"
          :navigation="{
            nextEl: '.generation_filters-pagination_right',
            prevEl: '.generation_filters-pagination_left'
          }"
          :slidesPerView="6"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          slides-per-view="auto"
          :slidesPerGroup="1"
          :spaceBetween="15"
          style="padding: 25px 0; cursor: grab;"
        >
          <SwiperSlide
            v-for="(item, index) in undressLists"
            :key="item.id + 'categoriesUndress'"
            style="width: auto;"
            @click="activeUndressListType = item.id"
          >
            <Card
              :active-item="activeUndressListType"
              :item="item"
            />
          </SwiperSlide>
        </Swiper>
        <!--   If Selected UndressType and show body options     -->
        <div v-show="activeUndressListType === 1" class="generation_filters-pagination">
          <div class="generation_filters-pagination-arrow generation_filters-UndressType_left swiper-button-prev"></div>
          <div class="generation_filters-pagination-arrow generation_filters-UndressType_right swiper-button-next"></div>
        </div>
        <Swiper
          v-show="activeUndressListType === 1"
          :navigation="{
            nextEl: '.generation_filters-UndressType_right',
            prevEl: '.generation_filters-UndressType_left'
          }"
          :modules="modules"
          :slidesPerView="4"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          slides-per-view="auto"
          :slidesPerGroup="1"
          :spaceBetween="15"
          style="padding: 25px 0; cursor: grab;"
        >
          <SwiperSlide
            v-for="(item, index) in ifSelectedUndressType"
            :key="item.id + 'garters'"
            @click="ifSelectedUndressTypeActiveType = item.id"
            style="width: auto;"
          >
            <Card
              :active-item="ifSelectedUndressTypeActiveType"
              :item="item"
            />
          </SwiperSlide>
        </Swiper>
        <!--   Body types for undressing     -->
        <div v-show="activeUndressListType === 1 && ifSelectedUndressTypeActiveType === 1" class="generation_filters-option">
          <h4 class="generation_filters-title">{{ $t('filters.selectedUndress.breast') }}</h4>
          <div class="generation_filters-option-wrapper">
            <Card
              @click="activeTits = item.id"
              :active-item="activeTits"
              v-for="item of breastArr"
              :key="item.id + 'tits'"
              :item="item"
            />
          </div>
        </div>
        <div v-show="activeUndressListType === 1 && ifSelectedUndressTypeActiveType === 2" class="generation_filters-option">
          <h4 class="generation_filters-title">{{ $t('filters.selectedUndress.butt') }}</h4>
          <div class="generation_filters-option-wrapper">
            <Card
              @click="activeBack = item.id"
              :active-item="activeBack"
              v-for="item of backTypes"
              :key="item.id + 'back'"
              :item="item"
            />
          </div>
        </div>
        <div v-show="activeUndressListType === 1 && ifSelectedUndressTypeActiveType === 3" class="generation_filters-pagination">
          <div class="generation_filters-pagination-arrow generation_filters-BodyType_left swiper-button-prev"></div>
          <div class="generation_filters-pagination-arrow generation_filters-BodyType_right swiper-button-next"></div>
        </div>
        <Swiper
          v-show="activeUndressListType === 1 && ifSelectedUndressTypeActiveType === 3"
          :modules="modules"
          :navigation="{
            nextEl: '.generation_filters-BodyType_right',
            prevEl: '.generation_filters-BodyType_left'
          }"
          :slidesPerView="6"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          slides-per-view="auto"
          :slidesPerGroup="1"
          :spaceBetween="15"
          style="padding: 25px 0; cursor: grab;"
        >
          <SwiperSlide
            v-for="(item, index) in bodyTypes"
            :key="item.id + 'categoriesUndress'"
            @click="activeBody = item.id"
            style="width: auto;"
          >
            <Card
              :active-item="activeBody"
              :item="item"
            />
          </SwiperSlide>
        </Swiper>
        <!--   FINISH types for undressing     -->

        <!--   Type for underwear in colored     -->
        <div v-show="activeUndressListType === 2" class="generation_filters-pagination">
          <div class="generation_filters-pagination-arrow generation_filters-underwear_left swiper-button-prev"></div>
          <div class="generation_filters-pagination-arrow generation_filters-underwear_right swiper-button-next"></div>
        </div>
        <Swiper
          v-show="activeUndressListType === 2"
          :modules="modules"
          :navigation="{
            nextEl: '.generation_filters-underwear_right',
            prevEl: '.generation_filters-underwear_left'
          }"
          :slidesPerView="4"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          style="padding: 25px 0; cursor: grab;"
          slides-per-view="auto"
          :slidesPerGroup="1"
          :spaceBetween="15"
        >
          <SwiperSlide
            v-for="(item, index) in ifSelectedUnderwearType"
            :key="item.id + 'underwear'"
            @click="ifSelectedUnderwearTypeActive = item.id"
            style="width: auto;"
          >
            <Card
              :active-item="ifSelectedUnderwearTypeActive"
              :item="item"
            />
          </SwiperSlide>
        </Swiper>
        <!--   Type for garters in colored     -->
        <div v-show="activeUndressListType === 3" class="generation_filters-pagination">
          <div class="generation_filters-pagination-arrow generation_filters-garters_left swiper-button-prev"></div>
          <div class="generation_filters-pagination-arrow generation_filters-garters_right swiper-button-next"></div>
        </div>
        <Swiper
          v-show="activeUndressListType === 3"
          :modules="modules"
          :navigation="{
            nextEl: '.generation_filters-garters_right',
            prevEl: '.generation_filters-garters_left'
          }"
          :slidesPerView="4"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          style="padding: 25px 0; cursor: grab;"
          slides-per-view="auto"
          :slidesPerGroup="1"
          :spaceBetween="15"
        >
          <SwiperSlide
            v-for="(item, index) in ifSelectedGartersType"
            :key="item.id + 'garters'"
            style="width: auto;"
            @click="ifSelectedGartersTypeActive = item.id"
          >
            <Card
              :active-item="ifSelectedGartersTypeActive"
              :item="item"
            />
          </SwiperSlide>
        </Swiper>
        <!--   Type for bikini in colored     -->
        <div v-show="activeUndressListType === 4" class="generation_filters-pagination">
          <div class="generation_filters-pagination-arrow generation_filters-bikini_left swiper-button-prev"></div>
          <div class="generation_filters-pagination-arrow generation_filters-bikini_right swiper-button-next"></div>
        </div>
        <Swiper
          v-show="activeUndressListType === 4"
          :modules="modules"
          :navigation="{
            nextEl: '.generation_filters-bikini_right',
            prevEl: '.generation_filters-bikini_left'
          }"
          :slidesPerView="4"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          space-between="0"
          style="padding: 25px 0; cursor: grab;"
          slides-per-view="auto"
          :slidesPerGroup="1"
          :spaceBetween="15"
        >
          <SwiperSlide
            v-for="(item, index) in ifSelectedBikiniType"
            :key="item.id + 'bikini'"
            style="width: auto;"
            @click="ifSelectedBikiniTypeActive = item.id"
          >
            <Card
              :active-item="ifSelectedBikiniTypeActive"
              :item="item"
            />
          </SwiperSlide>
        </Swiper>

        <!--    STATIC Category AGE    -->
        <div v-show="activeUndressListType === 1" class="generation_filters-option generation_filters-option-age">
          <h4 class="generation_filters-title">Age</h4>
          <div class="generation_filters-option-wrapper-age">
            <div
              class="generation_filters-option_item-age"
              v-for="item of ages"
              :key="item.id"
              @click="activeAge = item.id"
              :class="{'generation_filters-option_item--active': item.id === activeAge}"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeGenerationType === 2">
        <div v-show="activeGenerationType === 2" class="generation_filters-pagination">
          <div class="generation_filters-pagination-arrow generation_filters-poses_left swiper-button-prev"></div>
          <div class="generation_filters-pagination-arrow generation_filters-poses_right swiper-button-next"></div>
        </div>
        <Swiper
          :modules="modules"
          :navigation="{
            nextEl: '.generation_filters-poses_right',
            prevEl: '.generation_filters-poses_left'
          }"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          space-between="0"
          slides-per-view="auto"
          :slidesPerGroup="1"
          :spaceBetween="15"
          style="padding: 30px 0; cursor: grab;"
        >
          <SwiperSlide
            v-for="(item, index) in posesList"
            :key="item.id + 'poses'"
            style="width: auto;"
            @click="selectedPoses = item.id"
          >
            <Card
              class="generation_filters-option_item-poses-card"
              style="height: 172px;"
              :active-item="selectedPoses"
              :item="item"
            />
          </SwiperSlide>
        </Swiper>

        <div v-show="currentPosesChild.child.length >= 1" class="generation_filters-pagination">
          <div class="generation_filters-pagination-arrow generation_filters-suit_left swiper-button-prev"></div>
          <div class="generation_filters-pagination-arrow generation_filters-suit_right swiper-button-next"></div>
        </div>
        <Swiper
          v-show="currentPosesChild.child.length >= 1"
          :modules="modules"
          :navigation="{
            nextEl: '.generation_filters-suit_right',
            prevEl: '.generation_filters-suit_left'
          }"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          slides-per-view="auto"
          :slidesPerGroup="1"
          :spaceBetween="15"
          style="padding: 30px 0; cursor: grab;"
        >
          <SwiperSlide
            v-for="(item, index) in currentPosesChild.child"
            :key="item.id + currentPosesChild.keygen"
            style="width: auto;"
            @click.prevent="selectedOutfits = item.id"
          >
            <Card
              class="generation_filters-option_item-poses-card"
              style="height: 172px;"
              :active-item="selectedOutfits"
              :item="item"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="generation_filters_footer">
      <div
        @click="filtersPreventDefault"
        class="c-registration_footer-login c-registration_footer-login-btn--disabled"
      >
        {{ $t('edit.reset') }}
      </div>
      <div
        @click="handleGenerate"
        class="c-registration_footer-login c-registration_footer-login-btn"
      >
        {{ $t('edit.generate') }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import Card from "@/components/filter/Card.vue";
import undressTypeImg from '@/assets/filter-type-image/undress.png'
import posesTypeImg from '@/assets/anal/woman.webp'
import { useI18n } from "vue-i18n";
// Just Swiper
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { EffectFade, Pagination, Navigation } from "swiper";
import 'swiper/swiper-bundle.css';
// filter-type-for-undress
import bikiniImg from '@/assets/filters-bikini/black.webp'
import gartersImg from '@/assets/latex/black.webp'
import underwearImg from '@/assets/filter-underwear/black.webp'
// If selected undress type
import selectedUndressMiddleTits from '@/assets/filter-girls-images/middle.png'
import selectedUndressNormalBody from '@/assets/filter-girls-images/normal-body.png'
import selectedUndressMediumBack from '@/assets/filter-girls-images/medium-dupa.png'
// If selected underwear type
import blackImg from '@/assets/filter-underwear/black.webp'
import pinkImg from '@/assets/filter-underwear/pink.webp'
import greenImg from '@/assets/filter-underwear/green.webp'
import blueImg from '@/assets/filter-underwear/blue.webp'
import purpleImg from '@/assets/filter-underwear/purple.webp'
import orangeImg from '@/assets/filter-underwear/orange.webp'
// If selected garters LATEX type
import gartersBlackImg from '@/assets/latex/black.webp'
import gartersBlueImg from '@/assets/latex/blue.webp'
import gartersGreenImg from '@/assets/latex/green.webp'
import gartersPinkImg from '@/assets/latex/pink.webp'
import gartersOrangeImg from '@/assets/latex/orange.webp'
import gartersPurpleImg from '@/assets/latex/purple.webp'
// If selected Bikini type
import bikiniBlack from "@/assets/filters-bikini/black.webp"
import bikiniColored from "@/assets/filters-bikini/rainbow.webp"
import bikiniGreen from "@/assets/filters-bikini/green.webp"
import bikiniOrange from "@/assets/filters-bikini/orange.webp"
import bikiniPink from "@/assets/filters-bikini/pink.webp"
import bikiniPurple from "@/assets/filters-bikini/purple.webp"
// Poses
import cumshotImg from "@/assets/poses/cumshot.png"
import bbcImg from "@/assets/poses/bbcblowjob.png"
import cumInMImg from "@/assets/poses/cuminmouth.png"
import cumFaceImg from "@/assets/poses/cumface.png"
import dickCumImg from "@/assets/poses/dickcum.png"
import ahegaoImg from "@/assets/poses/ahegao.png"
import breastImg from "@/assets/poses/breastclamp.png"
import missionaryImg from "@/assets/poses/mission.png"
import gaggedImg from "@/assets/poses/gagged.png"
import analImg from "@/assets/poses/anal.png"
// Cumshot
import cumshotNone from "@/assets/cumshot/woman.webp"
import cumshotNun from "@/assets/cumshot/nun.webp"
import cumshotTeacher from "@/assets/cumshot/teacher.webp"
import cumshotStudent from "@/assets/cumshot/student.webp"
import cumshotNurse from "@/assets/cumshot/nurse.webp"
// BBC
import nunBBCImg from "@/assets/bbc/nun.webp"
import schoolBBCImg from "@/assets/bbc/student.webp"
import nurseBBCImg from "@/assets/bbc/nurse.webp"
import teacherBBCImg from "@/assets/bbc/teacher.webp"
import noneBBCImg from "@/assets/bbc/woman.webp"
// Cum in mouth
import nunMouth from "@/assets/cumMouth/nun.webp"
import nurseMouth from "@/assets/cumMouth/nurse.webp"
import studentMouth from "@/assets/cumMouth/student.webp"
import noneMouth from "@/assets/cumMouth/woman.webp"
import teacherMouth from "@/assets/cumMouth/teacher.webp"
// Face Cum
import faceCumNun from "@/assets/faceCum/nun.webp"
import faceCumNurse from "@/assets/faceCum/nurse.webp"
import faceCumSchool from "@/assets/faceCum/student.webp"
import faceCumTeacher from "@/assets/faceCum/teacher.webp"
import faceCumWoman from "@/assets/faceCum/woman.webp"
// Dick Cum
import dickCumNun from "@/assets/dickCum/nun.webp"
import dickCumNurse from "@/assets/dickCum/nurse.webp"
import dickCumStudent from "@/assets/dickCum/student.webp"
import dickCumTeacher from "@/assets/dickCum/teacher.webp"
import dickCumNone from "@/assets/dickCum/woman.webp"
// Ahegao Japan
import ahegaoNun from "@/assets/ahegao/nun.webp"
import ahegaoNurse from "@/assets/ahegao/nurse.webp"
import ahegaoStudent from "@/assets/ahegao/student.webp"
import ahegaoTeacher from "@/assets/ahegao/teacher.webp"
import ahegaoNone from "@/assets/ahegao/woman.webp"
// Breast Clamp
import breastNun from "@/assets/breast/nun.webp"
import breastNurse from "@/assets/breast/nurse.webp"
import breastStudent from "@/assets/breast/student.webp"
import breastTeacher from "@/assets/breast/teacher.webp"
import breastNone from "@/assets/breast/woman.webp"
// Anal
import analNone from "@/assets/anal/woman.webp"
import analNun from "@/assets/anal/nun.webp"
import analTeacher from "@/assets/anal/teacher.webp"
import analStudent from "@/assets/anal/student.webp"
import analNurse from "@/assets/anal/nurse.webp"

// Mission
import missionNone from "@/assets/mission/woman.webp"
import missionNun from "@/assets/mission/nun.webp"
import missionTeacher from "@/assets/mission/teacher.webp"
import missionStudent from "@/assets/mission/student.webp"
import missionNurse from "@/assets/mission/nurse.webp"

// Gagged
import gaggedNun from "@/assets/gagged/nun.webp"
import gaggedNurse from "@/assets/gagged/nurse.webp"
import gaggedTeacher from "@/assets/gagged/teacher.webp"
import gaggedStudent from "@/assets/gagged/student.webp"
import gaggedNone from "@/assets/gagged/woman.webp"
// Titsjob
import titsjobNun from "@/assets/titsBlowjob/nun.webp"
import titsjobNurse from "@/assets/titsBlowjob/nurse.webp"
import titsjobTeacher from "@/assets/titsBlowjob/teacher.webp"
import titsjobStudent from "@/assets/titsBlowjob/student.webp"
import titsjobNone from "@/assets/titsBlowjob/woman.webp"
// Male Blowjob
import maleBlowJob from "@/assets/maleBlowjob/manBlowjob.webp"

export default {
  name: "SettingsFilter",
  components: {
    Swiper,
    SwiperSlide,
    Card
  },
  props: {
    isOpenFilters: Boolean,
    breastArr: {},
    backTypes: {},
    bodyTypes: {},
    ages: {},
  },
  setup(_, { emit }) {
    const { t } = useI18n()

    const activeTits = ref(1)
    const activeBack = ref(1)
    const activeBody = ref(1)
    const activeAge = ref(1)

    const currentActiveType = ref(1)

    const activeGenerationType = ref(1)

    const undressType = {
      id: 1,
      img: undressTypeImg,
      title: t('filters.undress'),
      premium: false
    }

    const posesType = {
      id: 2,
      img: posesTypeImg,
      title: t('filters.poses'),
      premium: true,
    }
    // Undress Categories
    const activeUndressListType = ref(1)
    const undressLists = [
      { id: 1, title: t('filters.undressBlock.undress'), img: undressTypeImg, premium: true },
      { id: 2, title: t('filters.undressBlock.underwear'), img: underwearImg, premium: false },
      { id: 3, title: t('filters.undressBlock.garters'), img: gartersImg, premium: false },
      { id: 4, title: t('filters.undressBlock.bikini'), img: bikiniImg, premium: false },
    ]
    // UndressType
    const ifSelectedUndressTypeActiveType = ref(1)
    const ifSelectedUndressType = [
      { id: 1, title: t('filters.selectedUndress.breast'), img: selectedUndressMiddleTits },
      { id: 2, title: t('filters.selectedUndress.butt'), img: selectedUndressMediumBack },
      { id: 3, title: t('filters.selectedUndress.body'), img: selectedUndressNormalBody },
    ]
    // UNDERWEAR
    const ifSelectedUnderwearTypeActive = ref(1)
    const ifSelectedUnderwearType = [
      { id: 1, title: t('filters.selectedGarters.black'), img: blackImg, value: 'black' },
      { id: 2, title: t('filters.bikini.pink'), img: pinkImg, value: 'pink' },
      { id: 3, title: t('filters.bikini.blue'), img: blueImg, value: 'blue' },
      { id: 4, title: t('filters.bikini.green'), img: greenImg, value: 'green' },
      { id: 5, title: t('filters.bikini.orange'), img: orangeImg, value: 'orange' },
      { id: 6, title: t('filters.bikini.purple'), img: purpleImg, value: 'purple' },
    ]
    // GARTERS
    const ifSelectedGartersTypeActive = ref(1)
    const ifSelectedGartersType = [
      { id: 1, title: t('filters.selectedGarters.black'), img: gartersBlackImg, value: 'black'  },
      { id: 2, title: t('filters.bikini.blue'), img:  gartersBlueImg, value: 'pink'  },
      { id: 3, title: t('filters.bikini.green'), img: gartersGreenImg, value: 'green'  },
      { id: 4, title: t('filters.bikini.orange'), img: gartersOrangeImg, value: 'orange'  },
      { id: 5, title: t('filters.bikini.pink'), img: gartersPinkImg, value: 'pink'  },
      { id: 6, title: t('filters.bikini.purple'), img: gartersPurpleImg, value: 'purple'  },
    ]
    // BIKINI
    const ifSelectedBikiniTypeActive = ref(1)
    const ifSelectedBikiniType = [
      { id: 1, title: t('filters.bikini.black'), img: bikiniBlack, value: 'black' },
      { id: 2, title: t('filters.bikini.colored'), img: bikiniColored, value: 'rainbow' },
      { id: 3, title: t('filters.bikini.green'), img: bikiniGreen, value: 'green' },
      { id: 4, title: t('filters.bikini.pink'), img: bikiniPink, value: 'pink' },
      { id: 5, title: t('filters.bikini.orange'), img: bikiniOrange, value: 'orange' },
      // { id: 6, title: t('filters.bikini.purple'), img: bikiniPurple, value: 'purple' },
    ]

    // POSES

    // Cumshot on tits
    const cumshotTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: cumshotNone, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: cumshotNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.school'), img: cumshotTeacher, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: cumshotStudent, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: cumshotNurse, value: 'nurse'},
    ]
    // BBC
    const bbcTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: noneBBCImg, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: nunBBCImg, value: 'nun'},
      { id: 3, title: t('filters.ahegao.student'), img: schoolBBCImg, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: teacherBBCImg, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: nurseBBCImg, value: 'nurse'},
    ]
    // Cum in mouth
    const cumMouthTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: noneMouth, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: nunMouth, value: 'nun'},
      { id: 3, title: t('filters.ahegao.student'), img: studentMouth, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: teacherMouth, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: nurseMouth, value: 'nurse'},
    ]
    // Cum Face
    const faceCumTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: faceCumWoman, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: faceCumNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.school'), img: faceCumSchool, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: faceCumTeacher, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: faceCumNurse, value: 'nurse'},
    ]
    // Dick Cum
    const dickCumTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: dickCumNone, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: dickCumNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.student'), img: dickCumStudent, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: dickCumTeacher, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: dickCumNurse, value: 'nurse'},
    ]
    // Ahegao
    const ahegaoTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: ahegaoNone, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: ahegaoNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.school'), img: ahegaoStudent, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: ahegaoTeacher, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: ahegaoNurse, value: 'nurse'},
    ]
    // Breast Clamp
    const breastTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: breastNone, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: breastNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.student'), img: breastStudent, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: breastTeacher, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: breastNurse, value: 'nurse'},
    ]
    // Gagged
    const gaggedTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: gaggedNone, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: gaggedNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.school'), img: gaggedStudent, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: gaggedTeacher, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: gaggedNurse, value: 'nurse'},
    ]
    // Anal
    const analTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: analNone, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: analNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.school'), img: analStudent, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: analTeacher, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: analNurse, value: 'nurse'},
    ]
    // Mission
    const misionTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: missionNone, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: missionNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.school'), img: missionStudent, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: missionTeacher, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: missionNurse, value: 'nurse'},
    ]
    // Mission
    const titsBlowjobTypes = [
      { id: 1, title: t('filters.ahegao.none'), img: titsjobNone, value: 'none'},
      { id: 2, title: t('filters.ahegao.nun'), img: titsjobNun, value: 'nun'},
      { id: 3, title: t('filters.ahegao.school'), img: titsjobStudent, value: 'student'},
      { id: 4, title: t('filters.ahegao.teacher'), img: titsjobTeacher, value: 'teacher'},
      { id: 5, title: t('filters.ahegao.nurse'), img: titsjobNurse, value: 'nurse'},
    ]
    // Male Blowjob
    const maleBlowjobTypes = [
      { id: 1, title: t('filters.posesTypes.maleBlowjob'), img: maleBlowJob, value: 'none'},
    ]

    // POSES
    const categories = [
      "",
      "boobs in cum",
      "titsjob",
      "blowjob",
      "cum in mouth",
      "cum on face",
      "cum on face and boobs",
      "ahegao",
      "breast clamp",
      "missioniere",
      "ball gag",
      "analride",
      "maleblowjob"
    ];
    const selectedOutfits = ref(1)
    const selectedPoses = ref(1)
    const posesList = [
      { id: 1, title: t('filters.posesTypes.cumshot'), img: cumshotNone, child: cumshotTypes, keygen: 'cumshot' },
      { id: 2, title: t('filters.posesTypes.titsJob'), img: titsjobNone, child: titsBlowjobTypes, keygen: 'titsjob' },
      { id: 3, title: t('filters.posesTypes.bbcblowjob'), img: noneBBCImg, child: bbcTypes, keygen: 'bbc' },
      { id: 4, title: t('filters.posesTypes.cuminmouth'), img: noneMouth, child: cumMouthTypes, keygen: 'cuminmouth' },
      { id: 5, title: t('filters.posesTypes.cumface'), img: faceCumWoman, child: faceCumTypes, keygen: 'cumface' },
      { id: 6, title: t('filters.posesTypes.dickcum'), img: dickCumNone, child: dickCumTypes, keygen: 'dickcum' },
      { id: 7, title: t('filters.posesTypes.ahegao'), img: ahegaoNone, child: ahegaoTypes, keygen: 'ahegao' },
      { id: 8, title: t('filters.posesTypes.breastclamp'), img: breastNone, child: breastTypes, keygen: 'breast' },
      { id: 9, title: t('filters.posesTypes.mission'), img: missionNone, child: misionTypes, keygen: 'mission' },
      { id: 10, title: t('filters.posesTypes.gagged'), img: gaggedNone, child: gaggedTypes, keygen: 'gagged' },
      { id: 11, title: t('filters.posesTypes.anal'), img: analNone, child: analTypes, keygen: 'anal' },
      { id: 12, title: t('filters.posesTypes.maleBlowjob'), img: maleBlowJob, child: maleBlowjobTypes, keygen: 'maleblowjob' }
    ]
    // Get Child array's data from poses
    const currentPosesChild = computed(() => {
      const result = posesList.find(item => item.id === selectedPoses.value)
      if (result) {
        return {
          child: result.child,
          keygen: result.keygen
        }
      }

      return {
        child: [],
        keygen: 'notFound'
      }
    })
    const childData = computed(() => currentPosesChild.value.child);
    // Prevent default child from poses Array
    watch(childData, (newValue, oldValue) => {
      selectedOutfits.value = 1
    });


    const closeFilter = () => {
      emit('close')
    }
    const handleGenerate = () => {
      if (activeGenerationType.value === 1) {
        undressGeneration()
      }
      if (activeGenerationType.value === 2) {
        posesGeneration()
      }
    }
    const posesGeneration = () => {
      emit('handleGenerate', {
        generation_type: categories[selectedPoses.value],
        character_type: currentPosesChild.value.child.find(item => item.id === selectedOutfits.value).value,
        type: 'poses'
      });
    }
    const undressGeneration = () => {
      switch (activeUndressListType.value) {
        case 1: {
          emit('handleGenerate', {
            activeTits: activeTits.value,
            activeBack: activeBack.value,
            activeBody: activeBody.value,
            activeAge: activeAge.value,
            type: 'undress'
          });
        }
          break
        case 2: {
          emit('handleGenerate', {
            generation_type: 'underwear',
            character_type: ifSelectedUnderwearType.find(item => item.id === ifSelectedUnderwearTypeActive.value).value,
            type: 'inpaint'
          });
        }
          break
        case 3: {
          emit('handleGenerate', {
            generation_type: 'latex',
            character_type: ifSelectedGartersType.find(item => item.id === ifSelectedGartersTypeActive.value).value,
            type: 'inpaint'
          });
        }
          break
        case 4: {
          emit('handleGenerate', {
            generation_type: 'bikini',
            character_type: ifSelectedBikiniType.find(item => item.id === ifSelectedBikiniTypeActive.value).value,
            type: 'inpaint'
          });
        }
          break
        default:
          return;
      }
    }
    const filtersPreventDefault = () => {
      activeTits.value = 1
      activeBack.value = 1
      activeBody.value = 1
      activeAge.value = 1
    }
    return {
      filtersPreventDefault,
      handleGenerate,
      closeFilter,
      selectedOutfits,
      currentPosesChild,
      posesList,
      selectedPoses,
      ifSelectedUndressTypeActiveType,
      ifSelectedUndressType,
      ifSelectedGartersType,
      ifSelectedGartersTypeActive,
      ifSelectedBikiniType,
      ifSelectedBikiniTypeActive,
      ifSelectedUnderwearType,
      ifSelectedUnderwearTypeActive,
      activeGenerationType,
      activeUndressListType,
      undressLists,
      currentActiveType,
      activeTits,
      activeBack,
      activeBody,
      activeAge,
      undressType,
      posesType,
      modules: [EffectFade, Pagination, Navigation],
    };
  }
}
</script>

<style scoped>

</style>
