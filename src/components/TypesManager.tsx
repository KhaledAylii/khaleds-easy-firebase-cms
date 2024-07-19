"use client";
import { getEntry, listEntries, upsertEntry } from "@/helpers/api";
import { Button } from "./Button";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";

const TypeCard = () => {
  return <></>;
};

export const TypesManager = () => {
  // get types
  const handleCreateType = () => {
    upsertEntry(`${uuidv4()}`, "types", {});
  };

  const [types, setTypes] = useState({});

  useEffect(() => {
    listEntries("types").then((val) => {
      if (val?.data) {
        setTypes(val.data);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {types &&
        Object.entries(types)?.map(([typeId, typeData]) => {
          const typeContent = JSON.parse(typeData.content);
          return (
            <ListCard key={typeId}>
              {typeContent?.name ? typeContent.name : "Untitled Type"}
            </ListCard>
          );
        })}
      <Button onClick={handleCreateType} className="mt-4">
        Create Type
      </Button>
    </div>
  );
};
