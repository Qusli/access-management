import { defineStore } from "pinia";
import { AppState, RecordItem, RecordType } from "../types/";

export const useAppStore = defineStore({
  id: "app-store",
  state: (): AppState => ({
    records: [],
  }),
  getters: {},
  actions: {
    /* INIT */
    init() {
      const records = localStorage.getItem("records");

      if (records) {
        this.records = JSON.parse(records);
      }
    },
    /* END INIT */

    addRecord(record: RecordItem) {
      this.records.push(record);
    },

    removeRecord(id: string) {
      const index = this.records.findIndex((el) => el.id === id);

      this.records.splice(index, 1);

      /* SAVE RECORDS */
      this.saveRecords();
    },

    saveRecords() {
      if (this.validation()) {
        localStorage.setItem("records", JSON.stringify(this.records));
      }
    },

    /** Валидация пароля */
    validatePassword(record: RecordItem): boolean {
      /* Делаем дополнительную проверку, если тип записи являеться локальным */
      if (record.recordType === RecordType.LOCAL) {
        if (!record.password) {
          return false;
        }
        if (record.password.length > 100) {
          return false;
        }
      }

      return true;
    },

    /** Валидация логина */
    validateLogin(record: RecordItem): boolean {
      /* Если записи пустые */
      if (!record.login) {
        return false;
      }

      if (record.login.length > 100) {
        return false;
      }

      return true;
    },

    /** Валидация меток */
    validateMarks(record: RecordItem): boolean {
      if (!record.marks.length) return true;
      return record.marks.some((el) => {
        if (el.text.length > 50) {
          return false;
        }

        return true;
      });
    },

    /** Валидация записей */
    validation(): boolean {
      return !this.records.some((el) => {
        return (
          !this.validateLogin(el) ||
          !this.validatePassword(el) ||
          !this.validateMarks(el)
        );
      });
    },
  },
});
