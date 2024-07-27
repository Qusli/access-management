<script setup lang="ts">
import PlusIcon from "@/app/assets/icons/plus.svg";

interface Props {
  isAdd?: boolean;
}

withDefaults(defineProps<Props>(), {
  isAdd: false,
});
</script>

<template>
  <button class="button">
    <div class="button-content">
      <PlusIcon v-if="isAdd" class="button-content__icon" />
      <slot></slot>
    </div>
  </button>
</template>

<style scoped lang="scss">
.button {
  background-color: colors.$primary;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &-content {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    padding: 10px 5px;
    color: white;
    transition: all 0.3s ease-in-out;

    &__icon * {
      transition: all 0.3s ease-in-out;
    }
  }

  &:hover {
    background-color: transparent;
    border-color: colors.$primary;

    .button-content {
      color: colors.$primary;

      &__icon * {
        stroke: colors.$primary;
      }
    }
  }
}
</style>
