<script setup lang="ts">
import { type InputTypeHTMLAttribute, type Ref, ref } from "vue";
import EyeIcon from "@/app/assets/icons/eye.svg";
import EyeOffIcon from "@/app/assets/icons/eye-off.svg";

interface Props {
  type: InputTypeHTMLAttribute;
  isPassword?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isPassword: false,
  isError: false,
});

const model = defineModel();

// refs
const type: Ref<InputTypeHTMLAttribute> = ref(props.type);
const focus: Ref<boolean> = ref(false);
</script>

<template>
  <div class="input-container">
    <input
      :type="type"
      v-model="model"
      :class="[
        'input-container__input',
        isError ? 'input-container__input--error' : '',
      ]"
      @focusin="focus = true"
      @focusout="focus = false"
    />
    <EyeIcon
      v-if="isPassword && type === 'text'"
      @click="type = 'password'"
      class="input-container__eye-icon"
    />
    <EyeOffIcon
      v-if="isPassword && type === 'password'"
      @click="type = 'text'"
      class="input-container__eye-off-icon"
    />
    <Transition name="message">
      <div v-if="focus && isError" class="input-container-message">
        <span class="input-container-message__text">{{ errorMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  &__input {
    width: inherit;
    height: 20px;
    font-size: 16px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    border: 1px solid colors.$gray;
    border-radius: 5px;
    transition: border-color .3s ease-in-out;

    &--error {
      border-color: red;
    }
  }

  &__eye-icon,
  &__eye-off-icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }

  &-message {
    position: absolute;
    width: fit-content;
    top: 100%;
    background-color: white;
    box-shadow: 0 1px 1px 1px #00000025;
    padding: 5px 10px;
    pointer-events: none;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    z-index: 100;

    &__text {
      font-size: 12px;
    }
  }
}

/* ANIMATION */
.message-enter-active,
.message-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
}
</style>
