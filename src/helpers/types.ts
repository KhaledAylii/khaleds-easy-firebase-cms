export type FieldType = "text" | "markdown" | "number" | "image";

export interface EntryTypeField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
}

export interface EntryType {
  id: string;
  name: string;
  fields: EntryTypeField[];
}

export interface CollectionEntry {
  id: string;
  name: string;
  collectionId: string;
  values: { [key: string]: { value: string; metadata: EntryTypeField } };
}

export interface EntryCollection {
  id: string;
  name: string;
  type: string;
}

export type Entry<T = any> = { id: string; type: string } & T;

export type FormErrors = { [key: string]: string | { [key: string]: string } };
