<template>
  <div class="p-edit">
    <div class="p-edit-container">
      <label for="uploadFile" class="p-edit_view">
        <div class="p-edit_view-wrapper">
          <img
            width="96px"
            height="96px"
            src="../assets/icons/upload.svg"
            alt="upload icon"
          />
          <div class="p-edit_view-wrapper_holder">
            <p class="p-edit_view-wrapper-title">
              {{ $t('edit.uploadTitle') }}
            </p>
            <p class="p-edit_view-wrapper-types">
              {{ $t('edit.types') }}
            </p>
          </div>
          <Button class="p-edit_view-wrapper-button">
            {{ $t('buttons.upload') }}
          </Button>
        </div>
      </label>
    </div>
    <input
      id="uploadFile"
      v-show="false"
      type="file"
      @change="updateFile"
    />
    <div class="p-edit_filter">
      <router-link to="/" class="c-header-logo p-edit_filter-logo">
        <img
          width="54"
          height="36"
          src="@/assets/icons/logo.svg"
          alt="logo icon"
        />
        <p class="c-header-subtitle">
          <span>{{ $t('main.capitalTitle') }}</span>{{ $t('main.secondLogoTitle') }}<span>{{ $t('main.capitalTitle') }}</span>{{ $t('main.firstLogoTitle') }}.AI
        </p>
      </router-link>
      <div class="p-edit_filter-holder">
        <SettingsFilter />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button";
import SettingsFilter from "../components/filter/SettingsFilter.vue";
import { ref } from "vue";
export default {
  name: "EditPage",
  components: {
    SettingsFilter,
    Button
  },
  setup () {
    const file = ref(null)
    const updateFile = event => {
      file.value = event.target.files[0]
    }

    console.log(file)

    return {
      updateFile
    }
  }
}
</script>

<style lang="scss">
.p-edit {
  height: 100vh;
  display: flex;
  overflow: hidden;
  &-container {
    padding: 24px;
    height: 100%;
    display: block;
  }
  &_view {
    width: 80vw;
    display: block;
    height: 100%;
    background-image: url("../assets/bg-edit.svg");
    position: relative;
    cursor: pointer;
    &-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 25px;
      z-index: -1;
      &-title {
        font-size: 18px;
        font-weight: 700;
      }
      &-types {
        opacity: .4;
      }
      &_holder {
        line-height: 1.5;
        text-align: center;
      }
    }
  }
  &_filter {
    background-color: rgb(22, 22, 22);
    width: 100%;
    padding: 24px;
    &-logo {
      padding: 10px 0;
    }
    &-holder {
      overflow: auto;
      height: 100%;
    }
  }
}
</style>
