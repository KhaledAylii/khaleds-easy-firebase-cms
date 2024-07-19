"use client";
import { upsertEntry } from "@/helpers/api";
import {
  EntryType,
  EntryTypeField,
  FieldType,
  FormErrors,
} from "@/helpers/types";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { v4 } from "uuid";
import { Button } from "./Button";
import { ListCard } from "./ListCard";
import { Text } from "./Text";
import { Input } from "./Input";
import { Select } from "./Select";
import { usePathname, useRouter } from "next/navigation";
import { invalidatePage } from "@/helpers/actions";

const FieldCard: FC<{
  field: EntryTypeField;
  index: number;
  errors: { [key: string]: string };
  setEntryType: Dispatch<SetStateAction<EntryType>>;
}> = ({ field, index, errors, setEntryType }) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntryType((prev) => {
      const newFields = prev.fields;
      const prevField = newFields[index];
      newFields.splice(index, 1, { ...prevField, name: e.target.value });
      return { ...prev, fields: newFields };
    });
  };
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEntryType((prev) => {
      const newFields = prev.fields;
      const prevField = newFields[index];
      newFields.splice(index, 1, {
        ...prevField,
        type: e.target.value as FieldType,
      });
      return { ...prev, fields: newFields };
    });
  };
  const handleDeleteField = () => {
    setEntryType((prev) => {
      const newFields = prev.fields;
      newFields.splice(index, 1);
      return { ...prev, fields: newFields };
    });
  };
  return (
    <ListCard className="flex flex-col gap-2">
      <Text>Name</Text>
      <Input
        placeholder="entry type name"
        value={field.name}
        onChange={handleNameChange}
      />
      {errors?.["name_empty"] && (
        <Text className="text-sm" variant="error">
          {errors["name_empty"] as string}
        </Text>
      )}
      <Text>Type</Text>
      <Select onChange={handleTypeChange} value={field.type}>
        <option value={"text" as FieldType}>Text</option>
        <option value={"number" as FieldType}>Number</option>
        <option value={"markdown" as FieldType}>Markdown</option>
        <option value={"image" as FieldType}>Image</option>
      </Select>
      <Button onClick={handleDeleteField}>Delete Field</Button>
    </ListCard>
  );
};

export const EditTypeView: FC<{ existingType?: EntryType }> = ({
  existingType,
}) => {
  const [entryType, setEntryType] = useState<EntryType>(
    existingType ?? {
      id: "",
      name: "",
      fields: [],
    }
  );
  const router = useRouter();
  const pathname = usePathname();
  const [errors, setErrors] = useState<FormErrors>({});

  // returns true if errors exist in the form
  const hasInvalidInput = () => {
    const _errors: FormErrors = {};
    if (!entryType.name) {
      _errors["name_empty"] = "the entry type name cannot be empty";
    }
    if (entryType?.name?.includes(" ") || entryType?.name?.includes("!")) {
      _errors["name_illegal_char"] =
        "the entry type name cannot include special characters or spaces except hyphens and underscores";
    }
    entryType.fields.forEach((field, index) => {
      if (!field.name) {
        _errors[`field-${index}`] = {
          ...((_errors[`${field}-${index}`] as {}) ?? {}),
          name_empty: "the field name cannot be empty",
        };
      }
    });
    setErrors(_errors);
    return !!Object.keys(_errors).length;
  };

  const handleUpsertType = () => {
    if (hasInvalidInput()) return;
    const id = existingType ? existingType.id : v4();
    upsertEntry(id, "types", { ...entryType, id });
    const currentPath = `${pathname}`.split("/");
    invalidatePage(pathname);
    currentPath.pop();
    const newPath = currentPath.join("/");
    invalidatePage(newPath);
    router.push(newPath);
  };
  const handleCancel = () => {
    const currentPath = `${pathname}`.split("/");
    currentPath.pop();
    const newPath = currentPath.join("/");
    router.push(newPath);
  };
  const handleCreateField = () => {
    setEntryType((prev) => {
      return {
        ...prev,
        fields: [...prev.fields, { name: "", type: "text" } as EntryTypeField],
      };
    });
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntryType((prev) => {
      return { ...prev, name: e.target.value };
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Text>Name</Text>
        <Input
          placeholder="entry type name"
          value={entryType.name}
          onChange={handleNameChange}
        />
        {errors["name_empty"] && (
          <Text className="text-sm" variant="error">
            {errors["name_empty"] as string}
          </Text>
        )}
        {errors["name_illegal_char"] && (
          <Text className="text-sm" variant="error">
            {errors["name_illegal_char"] as string}
          </Text>
        )}
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <Text>Fields</Text>
        {entryType?.fields &&
          entryType.fields?.map((fieldData: EntryTypeField, index: number) => {
            return (
              <FieldCard
                key={`field-card-${index}`}
                field={fieldData}
                index={index}
                errors={errors[`field-${index}`] as { [key: string]: string }}
                setEntryType={setEntryType}
              />
            );
          })}
        <Button onClick={handleCreateField}>New Field</Button>
      </div>
      <hr />
      <div className="flex flex-row gap-2">
        <Button onClick={handleUpsertType}>
          {existingType ? "Save Type" : "Create Type"}
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
      {existingType && (
        <Text className="text-xs">
          Changes are only reflected in new objects and objects with this type
          edited after the change.
        </Text>
      )}
    </div>
  );
};
