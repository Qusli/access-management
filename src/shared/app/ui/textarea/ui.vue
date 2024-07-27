<script setup lang="ts">
import { type ModelRef, type Ref, ref } from "vue";

interface Props {
  isError?: boolean;
  errorMessage?: string;
}

withDefaults(defineProps<Props>(), {
  isError: false,
});

const model: ModelRef<any, string> = defineModel();

// refs
const focus: Ref<boolean> = ref(false);
</script>

<template>
  <div class="textarea-container">
    <textarea
      v-model="model"
      :class="[
        'textarea-container__textarea',
        isError ? 'textarea-container__textarea--error' : '',
      ]"
      @focusin="focus = true"
      @focusout="focus = false"
    />
    <Transition name="message">
      <div v-if="focus && isError" class="textarea-container-message">
        <span class="textarea-container-message__text">{{ errorMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.textarea-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  &__textarea {
    width: inherit;
    height: 20px !important;
    font-size: 16px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    border: 1px solid colors.$gray;
    border-radius: 5px;
    resize: none;
    transition: opacity 0.3s ease-in-out;

    &--error {
      border-color: red;
    }
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
