<script setup lang="ts">
interface Props {
  items: Record<string, string>;
}

defineProps<Props>();

const model = defineModel();
</script>

<template>
  <div class="select-container">
    <select v-model="model" class="select-container__select">
      <option
        v-for="([key, item], index) in Object.entries(items)"
        :key="index"
        :value="key"
      >
        {{ item }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.select-container {
  display: flex;
  align-items: center;
  width: 100%;

  &__select {
    width: inherit;
    height: 30px;
    font-size: 16px;
    padding-right: 10px;
    padding-left: 10px;
    border: 1px solid colors.$gray;
    border-radius: 5px;
    background-color: white;
  }
}
</style>
