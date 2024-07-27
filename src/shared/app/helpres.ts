import { RecordItem, RecordType } from "./types";
import { v4 as uuidv4 } from "uuid";

export const getClearRecordItem = (): RecordItem => {
  return {
    id: uuidv4(),
    marks: [],
    recordType: RecordType.LOCAL,
    login: null,
    password: null,
  };
};
