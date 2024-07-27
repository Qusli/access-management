<script setup lang="ts">
import { onMounted } from "vue";
import { Header } from "@/features/header";
import { RecordTable } from "@/features/record-table";
import { useAppStore } from "@/shared/app";

// refs
const appStore = useAppStore();

onMounted(() => {
  appStore.init();
});
</script>

<template>
  <section class="wrapper">
    <Header />
    <RecordTable :records="appStore.records" />
  </section>
</template>

<style scoped lang="scss">
.wrapper {
  max-width: 1180px;
  margin: 0 auto;
}
</style>
