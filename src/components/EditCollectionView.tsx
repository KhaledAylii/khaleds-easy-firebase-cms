"use client";
import { upsertEntry } from "@/helpers/api";
import { EntryCollection, EntryType, FormErrors } from "@/helpers/types";
import { ChangeEvent, FC, useState } from "react";
import { v4 } from "uuid";
import { Button } from "./Button";
import { Text } from "./Text";
import { Input } from "./Input";
import { Select } from "./Select";
import { usePathname, useRouter } from "next/navigation";
import { invalidatePage } from "@/helpers/actions";

export const EditCollectionView: FC<{
  types?: { [key: string]: EntryType };
  existingCollection?: EntryCollection;
}> = ({ types, existingCollection }) => {
  const [entryCollection, setEntryCollection] = useState<EntryCollection>(
    existingCollection ?? {
      id: "",
      name: "",
      type: "",
    }
  );
  const router = useRouter();
  const pathname = usePathname();
  const [errors, setErrors] = useState<FormErrors>({});

  // returns true if errors exist in the form
  const hasInvalidInput = () => {
    const _errors: FormErrors = {};
    if (!entryCollection.name) {
      _errors["name_empty"] = "the collection name cannot be empty";
    }
    if (
      entryCollection?.name?.includes(" ") ||
      entryCollection?.name?.includes("!")
    ) {
      _errors["name_illegal_char"] =
        "the collection name cannot include special characters or spaces except hyphens and underscores";
    }
    if (!entryCollection?.type) {
      _errors["type_empty"] =
        "the collection type is empty, if none exist create some in the types page";
    }
    setErrors(_errors);
    return !!Object.keys(_errors).length;
  };

  const handleUpsertCollection = async () => {
    if (hasInvalidInput()) return;
    const id = existingCollection ? existingCollection.id : v4();
    upsertEntry(id, "collections", { ...entryCollection, id });
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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntryCollection((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEntryCollection((prev) => {
      return { ...prev, type: e.target.value };
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Text>Name</Text>
        <Input
          placeholder="entry collection name"
          value={entryCollection.name}
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
      <div className="flex flex-col gap-2">
        <Text>Type</Text>
        <Select value={entryCollection.type} onChange={handleTypeChange}>
          {types &&
            Object.values(types).map((type: EntryType, index: number) => {
              return (
                <option key={`${index}-entry-option`} value={type.id}>
                  {type.name}
                </option>
              );
            })}
        </Select>
        {errors["type_empty"] && (
          <Text className="text-sm" variant="error">
            {errors["type_empty"] as string}
          </Text>
        )}
      </div>
      <hr />
      <div className="flex flex-row gap-2">
        <Button onClick={handleUpsertCollection}>
          {existingCollection ? "Save Collection" : "Create Collection"}
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
      {existingCollection && (
        <Text className="text-xs">
          Changes are only reflected in new objects and objects with this type
          edited after the change.
        </Text>
      )}
    </div>
  );
};
