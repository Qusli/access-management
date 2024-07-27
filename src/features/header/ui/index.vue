<script setup lang="ts">
import { Button, useAppStore } from "@/shared/app";
import InfoIcon from "@/app/assets/icons/info.svg";
import WarningIcon from "@/app/assets/icons/warning.svg";
import { getClearRecordItem } from "@/shared/app/helpres";

// refs
const appStore = useAppStore();
</script>

<template>
  <header class="header">
    <div class="header-controls">
      <h1 class="header-controls__title">Учётные записи</h1>
      <Button :is-add="true" @click="appStore.addRecord(getClearRecordItem())">
        Добавить запись
      </Button>
    </div>
    <div class="header-helper">
      <div class="header-helper-info">
        <InfoIcon />
        <p>
          Для указания нескольких метов для одной пары логин/пароль используйте
          разделитель ;
        </p>
      </div>
      <Transition name="helper">
        <div v-if="!appStore.validation()" class="header-helper-warning">
          <WarningIcon />
          <p>
            Если присутствуют незаполненые поля или поля с ошибкой, то внесённые
            изменения не сохранятся
          </p>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;

  &-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    &__title {
      font-size: 24px;
      color: colors.$primary;
    }
  }

  &-helper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-info,
    &-warning {
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 15px;
      border-radius: 10px;
    }

    &-info {
      background-color: colors.$green-white;
    }

    &-warning {
      background-color: colors.$warning;
    }

    /* ANIMATION */
    .helper-enter-active,
    .helper-leave-active {
      transition: opacity 0.3s ease-in-out;
    }

    .helper-enter-from,
    .helper-leave-to {
      opacity: 0;
    }
  }
}
</style>
