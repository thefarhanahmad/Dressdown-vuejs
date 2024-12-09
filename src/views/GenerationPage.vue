<template>
  <div class="generation">
    <div>
      <div class="generation-container">
        <div class="generation-balance">
          {{ $t("generation.creditBalance", { balance: getMyBalance }) }}
        </div>
        <label
          :for="generatedImage === '' ? `uploadImg` : ''"
          class="generation_upload"
          @dragover.prevent
          @drop="handleDrop"
          :class="{ 'generation_upload--removed': currentImage.file }"
        >
          <!--       :style="`background-image: linear-gradient(#000000a6, #000000ab), url(${generatedImage})`"-->
          <template v-if="!isInOrder">
            <img
              v-if="currentImage.src && generatedImage === ''"
              class="generation_upload-image"
              :src="currentImage.src"
              alt="uploaded image"
            />
            <div
              v-if="!currentImage.src && generatedImage === ''"
              class="generation-container-image"
            >
              <img
                class="generation_upload-icon"
                src="@/assets/icons/upload-image.svg"
                alt="upload file image upload-some"
                draggable="false"
              />
              <h2 class="generation-container-image_title">
                {{ $t("edit.dragNDrop") }}
              </h2>
              <p class="generation-container-image_description">
                {{ $t("edit.fileSupported") }}
              </p>
            </div>
            <img
              @click="invokeZoom"
              v-if="generatedImage !== ''"
              class="generation_upload-image"
              :src="generatedImage"
              alt="upload file image upload-some"
            />
          </template>
          <div class="generation-uploading" v-else>
            <img
              class="generation_upload-image"
              :src="currentImage.src"
              alt="uploaded image"
            />
            <div class="generation-uploading--background"></div>
            <LoadAnimation
              v-show="percentage >= 100"
              class="generation-uploading--loader"
            />
            <ProgressBarPercentage
              v-show="percentage < 100"
              :percentage="percentage"
            />
            <div
              v-show="percentage < 100"
              class="generation-uploading-percentage"
            >
              {{ percentage }} %
            </div>
            <div
              v-show="percentage >= 100"
              class="generation-uploading-text-after"
            >
              {{ $t("generation.almostDone") }}
            </div>
          </div>
          <input
            v-show="false"
            id="uploadImg"
            type="file"
            @input="handleFile"
            name="img"
            accept="image/*"
          />
        </label>
        <div class="generation-invoke-filters">
          <button
            v-if="isInOrder || generatedImage === ''"
            @click="isOpenFilters = !isOpenFilters"
            class="generation-invoke-filters_button"
            :disabled="generatedImage !== '' || isInOrder"
            :class="{
              'generation-invoke-filters_button--disabled':
                generatedImage !== '' || isInOrder,
            }"
          >
            {{ $t("buttons.showFilters") }}
          </button>
          <button
            @click="removeImage"
            :class="{
              'generation-invoke-filters-cancel--once': generatedImage === '',
            }"
            class="generation-invoke-filters-cancel"
          >
            {{ $t("buttons.remove") }}
          </button>
          <button
            v-if="generatedImage !== '' && !isInOrder"
            @click="downloadImage"
            :class="{
              'generation-invoke-filters-download--once': generatedImage === '',
            }"
            class="generation-invoke-filters-download"
          >
            {{ $t("buttons.download") }}
          </button>
        </div>
      </div>
    </div>
    <SettingsFilter
      :is-open-filters="isOpenFilters"
      :breast-arr="breastArr"
      :back-types="backTypes"
      :body-types="bodyTypes"
      :ages="ages"
      @close="closeFilter"
      @handleGenerate="handleGenerate"
    />
  </div>
</template>

<script>
import { computed, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import LoadAnimation from "@/components/animations/LoadAnimation.vue";

import smallTits from "@/assets/filter-girls-images/small.png";
import middleTits from "@/assets/filter-girls-images/middle.png";
import largeTits from "@/assets/filter-girls-images/bigtits.png";

import smallBody from "@/assets/filter-girls-images/skiny-body.png";
import normalBody from "@/assets/filter-girls-images/normal-body.png";
import bigBody from "@/assets/filter-girls-images/fat.png";
import muscBody from "@/assets/filter-girls-images/muscular.png";

import smallBack from "@/assets/filter-girls-images/small-dupka.png";
import mediumBack from "@/assets/filter-girls-images/medium-dupa.png";
import bigBack from "@/assets/filter-girls-images/big-dupa.png";
import { useI18n } from "vue-i18n";
import SettingsFilter from "@/components/filter/SettingsFilter.vue";
import ProgressBarPercentage from "@/components/animations/ProgressBarPercentage.vue";

export default {
  name: "GenerationPage",
  components: {
    ProgressBarPercentage,
    SettingsFilter,
    LoadAnimation,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const isOpenFilters = ref(false);
    const percentage = ref(0);
    const intervalStatus = ref(null);
    const intervalLoad = ref(null);
    const currentImage = ref({
      src: "",
    });
    const isGenerating = ref(false);
    const isShowRecommendationPopup = localStorage.getItem(
      "isShowRecommendationPopup"
    );

    if (!isShowRecommendationPopup) {
      store.commit("addModal", "UploadRecommendation");
    }

    const isInOrder = computed(() => {
      return store.getters.isInOrder;
    });

    const removeImage = (showPopup = false) => {
      isOpenFilters.value = false;
      percentage.value = 0;
      currentImage.value = { src: "" };
      clearInterval(intervalStatus.value);
      clearInterval(intervalLoad.value);
      intervalStatus.value = null;
      intervalLoad.value = null;
      const fileInput = document.querySelector("#uploadImg");
      fileInput.value = "";
      store.commit("clearOrderId");
      store.commit("setGeneratedImage", "");
      if (!showPopup) {
        store.dispatch("handleToast", {
          text: t("errors.generate.removeImg"),
          type: "WARNING",
        });
      }
    };

    const getMyBalance = computed(() => {
      return store.getters.getMyBalance;
    });

    const handleDrop = (event) => {
      if (+getMyBalance.value <= 0) {
        store.commit("addModal", "Cash");
        removeImage();
        return;
      }
      percentage.value = 0;
      event.preventDefault();
      const file = event.dataTransfer.files[0];

      if (file.size >= 10485760) {
        store.dispatch("handleToast", {
          text: "The image size must not exceed 10 MB.",
          type: "WARNING",
        });
        removeImage(true);
        return;
      }

      if (file && file.type.startsWith("image/")) {
        handleFile({ target: { files: [file] } });
      }
    };

    const invokeZoom = () => {
      store.commit("addModal", "ZoomImage");
    };

    const handleFile = (event) => {
      if (+getMyBalance.value <= 0) {
        store.commit("addModal", "Cash");
        removeImage();
        return;
      }
      if (currentImage.value.file) {
        store.dispatch("handleToast", {
          text: "Sorry, you have to remove previous image!",
          type: "WARNING",
        });
        return;
      }
      percentage.value = 0;
      const image = event.target.files[0];

      if (image.size >= 10000000) {
        store.dispatch("handleToast", {
          text: "The image size must not exceed 10 MB.",
          type: "WARNING",
        });
        removeImage(true);
        return;
      }

      currentImage.value = {
        file: image,
        src: URL.createObjectURL(image),
      };
      isOpenFilters.value = true;
    };

    const isValid = computed(() => {
      return !!currentImage.value.file;
    });

    const breastArr = [
      { id: 0, title: "Small", img: smallTits, value: "small" },
      { id: 1, title: "medium", img: middleTits, value: "medium" },
      { id: 2, title: "large", img: largeTits, value: "large" },
    ];
    const bodyTypes = [
      { id: 0, title: "slim", img: smallBody, value: "slim" },
      { id: 1, title: "normal", img: normalBody, value: "normal" },
      { id: 2, title: "fat", img: bigBody, value: "fat" },
      { id: 3, title: "muscular", img: muscBody, value: "muscular" },
    ];
    const backTypes = [
      { id: 0, title: "Small", img: smallBack, value: "small" },
      { id: 1, title: "Normal", img: mediumBack, value: "medium" },
      { id: 2, title: "Big", img: bigBack, value: "large" },
    ];
    const ages = [
      { id: 0, title: "18" },
      { id: 1, title: "20" },
      { id: 2, title: "30" },
      { id: 3, title: "40" },
      { id: 4, title: "50" },
      { id: 5, title: "60" },
    ];

    const watcherTimer = ref(30000);

    const closeFilter = () => {
      isOpenFilters.value = !isOpenFilters.value;
    };

    const getSpentMoney = computed(() => {
      return store.getters.getSpentMoney;
    });

    const handleGenerate = async (filter) => {
      if (isGenerating.value) return;
      if (+getMyBalance.value <= 0) {
        store.commit("addModal", "Cash");
        removeImage();
        return;
      }
      if (!isValid.value) {
        await store.dispatch("handleToast", {
          type: "ERROR",
          text: "Please, upload a girl photo!",
        });
        return;
      }

      store.commit("setOrder", "loaded");

      isGenerating.value = true;

      if (filter.type === "undress") {
        // if (getSpentMoney.value >= 5) {
        await justUndressRequest(filter);
        // } else {
        //   store.commit('addModal', 'InfoAboutPremiumContent')
        //   isGenerating.value = false
        //   store.commit('clearOrderId')
        // }
      }
      if (filter.type === "inpaint") {
        await inPaintRequest(filter);
      }

      if (filter.type === "poses") {
        // if (getSpentMoney.value >= 5) {
        await posesRequest(filter);
        // } else {
        //   store.commit('addModal', 'InfoAboutPremiumContent')
        //   isGenerating.value = false
        //   store.commit('clearOrderId')
        // }
      }
    };

    const justUndressRequest = async (filter) => {
      try {
        const formData = new FormData();
        formData.append("image", currentImage.value.file);
        formData.append(
          "breast_size",
          breastArr.find((element) => element.id === filter.activeTits).value
        );
        formData.append(
          "butt_size",
          backTypes.find((element) => element.id === filter.activeBack).value
        );
        formData.append(
          "age",
          ages.find((element) => element.id === filter.activeAge).title
        );
        formData.append(
          "body_type",
          bodyTypes.find((element) => element.id === filter.activeBody).value
        );

        isOpenFilters.value = false;
        const response = await store.dispatch("generateGirl", formData);
        if (
          response.name === "AxiosError" ||
          response.message === "Network Error"
        ) {
          store.commit("addModal", "Cash");
          removeImage();
          return;
        }

        await createWatcher();
        await createLoadWatcher();
        await store.dispatch("getUserProfile");
      } catch (error) {
        console.error("Ошибка при генерации:", error);
        removeImage();
      } finally {
        isGenerating.value = false;
      }
    };

    const inPaintRequest = async (filter) => {
      try {
        const formData = new FormData();
        formData.append("image", currentImage.value.file);
        formData.append("generation_type", filter.generation_type);
        formData.append("character_type", filter.character_type);

        isOpenFilters.value = false;
        const response = await store.dispatch("generateInPaintGirl", formData);
        if (
          response.name === "AxiosError" ||
          response.message === "Network Error"
        ) {
          store.commit("addModal", "Cash");
          removeImage();
          return;
        }

        await createWatcher();
        await createLoadWatcher();
        await store.dispatch("getUserProfile");
      } catch (error) {
        console.error("Ошибка при генерации:", error);
        removeImage();
      } finally {
        isGenerating.value = false;
      }
    };

    const posesRequest = async (filter) => {
      try {
        const formData = new FormData();
        formData.append("image", currentImage.value.file);
        formData.append("generation_type", filter.generation_type);
        formData.append("character_type", filter.character_type);

        isOpenFilters.value = false;
        const response = await store.dispatch("generatePosesGirl", formData);
        if (
          response.name === "AxiosError" ||
          response.message === "Network Error"
        ) {
          store.commit("addModal", "Cash");
          removeImage();
          return;
        }

        await createWatcher();
        await createLoadWatcher();
        await store.dispatch("getUserProfile");
      } catch (error) {
        console.error("Ошибка при генерации:", error);
        removeImage();
      } finally {
        isGenerating.value = false;
      }
    };

    const zoomImage = () => {
      store.commit("addModal", "ZoomImage");
    };

    const createLoadWatcher = () => {
      if (percentage.value >= 100) {
        clearInterval(intervalLoad.value);
        percentage.value = 0;
      }

      intervalLoad.value = setInterval(async () => {
        percentage.value = percentage.value + 1;
        if (percentage.value >= 100) {
          clearInterval(intervalLoad.value);
          intervalLoad.value = null;
        }
      }, 600);
    };

    const createWatcher = () => {
      if (intervalStatus.value) {
        clearInterval(intervalStatus.value);
      }

      intervalStatus.value = setInterval(async () => {
        const response = await store.dispatch("checkStatus");

        if (watcherTimer.value === 30000) {
          watcherTimer.value = 10000;
          clearInterval(intervalStatus.value);
          createWatcher();
        }

        if (response && response.image_url) {
          clearInterval(intervalStatus.value);
          intervalStatus.value = null;
          store.commit("clearOrderId");
          watcherTimer.value = 30000;
        }
      }, watcherTimer.value);
    };

    const generatedImage = computed(() => {
      return store.getters.getGeneratedImage;
    });

    const downloadImage = async (event) => {
      try {
        const response = await fetch(generatedImage.value);
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "downloaded_image.png";
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error("Ошибка при скачивании изображения:", error);
      }
    };

    watch(isOpenFilters, (newValue) => {
      if (newValue) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    });

    onUnmounted(() => {
      if (intervalStatus.value) {
        clearInterval(intervalStatus.value);
      }
    });

    return {
      handleDrop,
      handleFile,
      zoomImage,
      handleGenerate,
      downloadImage,
      closeFilter,
      removeImage,
      invokeZoom,
      getMyBalance,
      percentage,
      isOpenFilters,
      generatedImage,
      isInOrder,
      currentImage,
      breastArr,
      backTypes,
      bodyTypes,
      ages,
    };
  },
};
</script>

<style lang="scss">
body.no-scroll {
  overflow: hidden;
}
.generation {
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  grid-gap: 20px;
  width: 100%;
  overflow: hidden;

  &-balance {
    font-size: 26px;
    font-weight: 600;
    margin: 16px;
    color: #b4f12f;
    @media screen and (max-width: 678px) {
      font-size: 24px;
    }
    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  }
  &-text {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    margin: 10px auto 20px auto;
  }
  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border: 1px solid #b4f12f;
    border-radius: 8px;
    height: 100%;
    max-height: 95%;
    min-height: 750px;
    max-width: 30%;
    margin: 0 auto 30px auto;
    padding: 0px 25px 25px 25px;
    background: rgba(180, 180, 180, 0.3);

    @media screen and (max-width: 1920px) {
      width: 45%;
    }
    @media screen and (max-width: 1800px) {
      width: 50%;
      max-width: 100%;
    }
    @media screen and (max-width: 1440px) {
      width: 70%;
      max-width: 100%;
    }
    @media screen and (max-width: 780px) {
      width: 95%;
    }
    @media screen and (max-width: 550px) {
      height: 550px;
      padding: 15px;
      padding-top: 0;
      min-height: 550px;
    }
    @media screen and (max-width: 450px) {
      height: 550px;
      min-height: 400px;
    }
    &-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      &_title {
        text-transform: uppercase;
        color: #ffffff;
        opacity: 0.85;
        margin-top: 5px;
        @media screen and (max-width: 550px) {
          font-size: 14px;
        }
      }
      &_description {
        margin-top: 5px;
        @media screen and (max-width: 550px) {
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
  &_upload {
    background-size: 120%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 700px;
    background: #808080;
    border-radius: 8px;

    @media screen and (max-width: 550px) {
      width: 100%;
      max-width: 100%;
      padding: 0;
      min-height: 250px;
      height: 400px;
    }

    &--removed {
      cursor: progress;
      border: none;
      border-radius: 8px;
      overflow: hidden;
    }

    &-icon {
      margin: 0 auto;
      @media screen and (max-width: 550px) {
        width: 40%;
      }
      &-done {
        width: 75%;
        margin: 0 auto;
        cursor: zoom-in;
        z-index: 4;
        @media screen and (max-width: 550px) {
          width: 100%;
        }
      }
    }
    &-image {
      margin: 0 auto;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-uploading {
    position: relative;
    width: 100%;
    margin: 0 auto;
    word-spacing: 2px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    height: 100%;
    line-height: 1.8;
    overflow: hidden;
    border-radius: 8px;
    &-percentage {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
    }
    &-text-after {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      font-size: 24px;
      font-weight: 700;
    }
    &--loader {
      position: absolute !important;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 550px) {
        //transform: scale(0.7);
        //left: 43%;
      }
      @media screen and (max-width: 460px) {
        //left: 35%;
      }
    }
    &--background {
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .generation_upload-image {
      filter: blur(3px);
    }
  }
  &-invoke-filters {
    gap: 45px;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 15px;

    @media screen and (max-width: 550px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      max-width: 100%;
      width: 100%;
    }

    &_button {
      border: none;
      background-color: #67eb00;
      height: 35px;
      min-width: 210px;
      border-radius: 8px;
      box-shadow: 1px 2px 10px #67eb00;
      cursor: pointer;
      outline: none;
      transition: all 0.3s;
      color: rgba(0, 0, 0, 0.8);
      font-weight: 700;
      &:hover {
        box-shadow: 1px 2px 25px #67eb00;
        color: rgba(0, 0, 0, 1);
      }
      &--disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      @media screen and (max-width: 550px) {
        width: 100%;
      }
    }
    &-cancel {
      border: none;
      background-color: rgb(222, 8, 47);
      height: 35px;
      min-width: 210px;
      border-radius: 8px;
      box-shadow: 1px 2px 10px rgb(222, 8, 47);
      cursor: pointer;
      outline: none;
      transition: all 0.3s;
      &--once {
        min-width: 240px;
      }
      &:hover {
        box-shadow: 1px 2px 25px rgb(222, 8, 47);
      }
      &--disabled {
        filter: grayscale(1);
        color: #f5f5f59e;
      }
      @media screen and (max-width: 550px) {
        width: 100%;
      }
    }
    &-download {
      border: none;
      background-color: rgba(0, 122, 255, 0.9);
      height: 35px;
      min-width: 210px;
      border-radius: 8px;
      box-shadow: 1px 2px 10px rgba(0, 122, 255, 0.9);
      cursor: pointer;
      outline: none;
      transition: all 0.3s;
      &--once {
        min-width: 240px;
      }
      &:hover {
        box-shadow: 1px 2px 25px rgba(0, 122, 255, 0.9);
      }
      &--disabled {
        filter: grayscale(1);
        color: #f5f5f59e;
      }
      @media screen and (max-width: 550px) {
        width: 100%;
      }
    }
  }
  &_filters {
    overflow: auto;
    height: 100%;
    position: fixed;
    right: -2000px;
    top: 0;
    transition: all 0.75s;
    background-color: rgba(10, 10, 10, 0.95);
    border-radius: 8px 8px 0 0;
    padding: 10px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 0;

    &--active {
      width: 25vw;
      max-width: 25vw;
      height: 100vh;
      z-index: 300;
      right: 0;
      @media screen and (max-width: 1920px) {
        width: 40vw;
        max-width: 40vw;
      }
      @media screen and (max-width: 950px) {
        padding-bottom: 80px;
        width: 100%;
        max-width: 100%;
      }
      @media screen and (max-width: 550px) {
        padding-bottom: 80px;
      }
    }

    &-holder {
      display: flex;
      flex-direction: column;
      &_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-icon {
          cursor: pointer;
        }
      }
      @media screen and (max-width: 900px) {
        margin-bottom: 5px;
      }
    }

    &-profile {
      display: block;
      text-align: left;
      width: 100%;
      margin: 0 auto;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(245, 245, 245, 0.56);
    }
    &-option {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 10px;
      margin-top: 10px;
      &-age {
        margin-top: 20px;
      }
      &-wrapper {
        display: flex;
        align-items: center;
        margin-top: 10px;
        gap: 10px;
        flex-wrap: wrap;
        &-age {
          display: flex;
          align-items: center;
          margin-top: 10px;
          gap: 10px;
          flex-wrap: wrap;
        }
      }
      &_item {
        width: 120px;
        min-height: 158px;
        border-radius: 8px;
        text-transform: capitalize;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        background-color: rgba(25, 25, 25, 0.95);
        border: 1px solid rgba(0, 0, 0, 0);
        box-shadow: 1px 2px 10px #000;
        overflow: hidden;
        position: relative;
        &-poses-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          width: 135px;
          border-radius: 8px;
        }
        &:hover {
          border: 1px solid #b4f12f;
        }
        &--active {
          background-color: #b4f12f;
          color: #000;
          .generation_filters-option_item-description {
            color: #000;
          }
        }
        &-age {
          border: 1px solid #b4f12f;
          border-radius: 50%;
          padding: 10px 10px;
          text-transform: capitalize;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        &-description {
          padding: 10px 15px;
          font-weight: 700;
          text-align: center;
          &-image {
            height: 127px;
            object-fit: cover;
            width: 100%;
            border-radius: 8px 8px 0 0;
          }
        }
        &-vip {
          width: 35px;
          height: 35px;
          position: absolute;
          right: 0;
          top: 0;
          background-color: rgba(27, 27, 27, 0.95);
          border-radius: 0 0 0 12px;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          &-icon {
            width: 20px;
            height: 20px;
            margin-bottom: 5px;
          }
        }
      }
    }
    &_footer {
      display: flex;
      align-items: center;
      gap: 20px;
      div {
        width: 50%;
        cursor: pointer;
      }
    }
    &-pagination {
      position: relative;
      margin: 5px 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      .swiper-button-lock {
        display: block;
      }
      &-arrow {
        color: white;
        width: 25px;
        height: 25px;
        margin-top: 0;
        position: relative !important;
        right: auto;
        left: auto;
        &::after {
          font-size: 22px;
        }
      }
      &_left {
      }
      &_right {
      }
    }
  }
}
</style>
