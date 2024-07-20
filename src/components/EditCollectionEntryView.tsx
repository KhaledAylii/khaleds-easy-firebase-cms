"use client";
import { upsertEntry } from "@/helpers/api";
import {
  EntryCollection,
  CollectionEntryType,
  FormErrors,
  CollectionEntry,
  EntryType,
  EntryTypeField,
} from "@/helpers/types";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { v4 } from "uuid";
import { Button } from "./Button";
import { Text } from "./Text";
import { Input } from "./Input";
import { Select } from "./Select";
import { usePathname, useRouter } from "next/navigation";
import { invalidatePage } from "@/helpers/actions";
import MDEditor from "@uiw/react-md-editor";

const CollectionEntryField: FC<{
  field: EntryTypeField;
  value: string;
  onChange: Dispatch<SetStateAction<CollectionEntry>>;
}> = ({ field, value, onChange }) => {
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange((prev) => {
      const newValues = prev.values;
      return {
        ...prev,
        values: {
          ...newValues,
          [field.id]: { value: e.target.value, metadata: field },
        },
      };
    });
  };
  const handleMarkdownChange = (value: string | undefined) => {
    onChange((prev) => {
      const newValues = prev.values;
      return {
        ...prev,
        values: {
          ...newValues,
          [field.id]: { value: value ?? "", metadata: field },
        },
      };
    });
  };
  if (field.type === "text") {
    return (
      <div className="flex flex-col gap-2">
        {`${field.name} (id: ${field.id})`}
        <Input value={value} onChange={handleFieldChange} />
      </div>
    );
  }
  if (field.type === "markdown") {
    return (
      <div className="flex flex-col gap-2">
        {`${field.name} (id: ${field.id})`}

        <MDEditor
          preview={"live"}
          value={value}
          onChange={handleMarkdownChange}
        />
      </div>
    );
  }
};

export const EditCollectionEntryView: FC<{
  collection: EntryCollection;
  type: EntryType;
  existingEntry?: CollectionEntry;
}> = ({ collection, type, existingEntry }) => {
  const defaultValues: CollectionEntry["values"] = {};
  type.fields.forEach((field: EntryTypeField) => {
    defaultValues[field.id] = { value: "", metadata: field };
  });
  const [collectionEntry, setCollectionEntry] = useState<CollectionEntry>(
    existingEntry ?? {
      id: "",
      name: "",
      collectionId: collection.id,
      values: defaultValues,
    }
  );
  const router = useRouter();
  const pathname = usePathname();
  const [errors, setErrors] = useState<FormErrors>({});

  // returns true if errors exist in the form
  const hasInvalidInput = () => {
    // const _errors: FormErrors = {};
    // if (!entryCollection.name) {
    //   _errors["name_empty"] = "the collection entry name cannot be empty";
    // }
    // if (
    //   entryCollection?.name?.includes(" ") ||
    //   entryCollection?.name?.includes("!")
    // ) {
    //   _errors["name_illegal_char"] =
    //     "the collection entry name cannot include special characters or spaces except hyphens and underscores";
    // }
    // if (!entryCollection?.type) {
    //   _errors["type_empty"] =
    //     "the collection entry type is empty, if none exist create some in the types page";
    // }
    // setErrors(_errors);
    // return !!Object.keys(_errors).length;
    return false;
  };

  const handleUpsertCollection = async () => {
    if (hasInvalidInput()) return;
    const id = existingEntry ? existingEntry.id : v4();
    upsertEntry(id, `collections_entries_${collection.id}`, {
      ...collectionEntry,
      id,
    });
    const currentPath = `${pathname}`.split("/");
    await invalidatePage(pathname);
    currentPath.pop();
    const newPath = currentPath.join("/");
    await invalidatePage(newPath);
    router.push(newPath);
  };
  const handleCancel = async () => {
    const currentPath = `${pathname}`.split("/");
    currentPath.pop();
    const newPath = currentPath.join("/");
    await invalidatePage(newPath);
    router.push(newPath);
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldId: string
  ) => {
    setCollectionEntry((prev) => {
      return { ...prev, values: { ...prev.values, [fieldId]: e.target.value } };
    });
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCollectionEntry((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Text>Name</Text>
      <Input
        placeholder="entry collection name"
        value={collectionEntry.name}
        onChange={handleNameChange}
      />
      {type.fields?.map((field) => {
        return (
          <CollectionEntryField
            key={`field-entry-${field.id}`}
            field={field}
            value={collectionEntry.values?.[field.id]?.value ?? ""}
            onChange={setCollectionEntry}
          />
        );
      })}
      <div className="flex flex-row gap-2">
        <Button onClick={handleUpsertCollection}>
          {existingEntry ? "Save Entry" : "Create Entry"}
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
      {existingEntry && (
        <Text className="text-xs">
          Changes are only reflected in new objects and objects with this type
          edited after the change.
        </Text>
      )}
    </div>
  );
};
