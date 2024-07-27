<script setup lang="ts">
import { Record } from "@/entities/record-table/";
import { RecordItem } from "@/shared/app";

interface Props {
  records: RecordItem[];
}

defineProps<Props>();
</script>

<template>
  <table class="record-table">
    <thead class="record-table-header">
      <th>Метки</th>
      <th>Тип записи</th>
      <th>Логин</th>
      <th>Пароль</th>
    </thead>
    <tbody>
      <Record v-for="record in records" :key="record.id" :record="record" />
      <p v-if="!records.length" class="not-found">Ничего нет</p>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.record-table {
  position: relative;
  table-layout: fixed;
  width: 100%;
  margin-top: 30px;

  &-header th {
    width: 25%;
    color: #bdbdbd;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    margin-bottom: 20px;
    margin-right: 10px;
  }
}

.not-found {
  position: absolute;
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  color: colors.$primary;
}
</style>
