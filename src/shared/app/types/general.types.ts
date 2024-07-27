export enum RecordType {
  LDAP = "ldap",
  LOCAL = "local",
}

export interface Mark {
  text: string;
}

export interface RecordItem {
  id: string;
  marks: Mark[];
  recordType: RecordType;
  login: string | null;
  password: string | null;
}
