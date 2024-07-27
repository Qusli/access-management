<script setup lang="ts">
import { type Ref, ref, watch, onMounted } from "vue";
import {
  RecordItem,
  Select,
  Textarea,
  Input,
  RecordType,
  useAppStore,
} from "@/shared/app";
import { RECORD_TYPE } from "@/shared/app/constants";
import TrashIcon from "@/app/assets/icons/trash.svg";

interface Props {
  record: RecordItem;
}

const { record } = defineProps<Props>();

// refs
const appStore = useAppStore();
const marks: Ref<string> = ref("");

// hooks
onMounted(() => {
  if (record.marks.length) {
    marks.value = record.marks.map((el) => el.text).join(";");
  }
});

watch(marks, (v) => {
  record.marks = v.split(";").map((el) => ({
    text: el,
  }));
});

watch(record, (v) => {
  if (v.recordType === RecordType.LDAP) {
    record.password = null;
  }
});
</script>

<template>
    <tr class="record">
      <td class="record-mark">
        <Textarea
          v-model="marks"
          :is-error="!appStore.validateMarks(record)"
          error-message="Длина не может больше 50 символов и поле не может быть пустым"
          @focusout="appStore.saveRecords"
        />
      </td>
      <td class="record-type">
        <Select
          :items="RECORD_TYPE"
          v-model="record.recordType"
          @update:model-value="appStore.saveRecords"
        />
      </td>
      <td class="record-login">
        <Input
          type="text"
          v-model="record.login"
          class="record-login__input"
          :is-error="!appStore.validateLogin(record)"
          error-message="Длина не может больше 100 символов и поле не может быть пустым"
          @focusout="appStore.saveRecords"
        />
      </td>
      <td class="record-password">
        <Input
          v-if="record.recordType === RecordType.LOCAL"
          type="password"
          v-model="record.password"
          :is-password="true"
          :is-error="!appStore.validatePassword(record)"
          error-message="Длина не может больше 100 символов и поле не может быть пустым"
          class="record-password__input"
          @focusout="appStore.saveRecords"
        />
      </td>
      <td>
        <TrashIcon
          @click="appStore.removeRecord(record.id)"
          class="record__trash-icon"
        />
      </td>
    </tr>
</template>

<style scoped lang="scss">
.record {
  td {
    padding-top: 10px;
    padding-right: 5px;
  }

  textarea,
  select {
    width: 100%;
  }

  &-login__input {
    width: calc(200% + 10px);
  }

  &:has(.record-password__input) {
    .record-login__input {
      width: 100%;
    }
  }

  &__trash-icon {
    cursor: pointer;

    * {
      transition: stroke 0.3s ease-in-out;
    }
  }

  &__trash-icon:hover * {
    stroke: red;
  }
}
</style>
