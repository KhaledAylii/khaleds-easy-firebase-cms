"use client";
import { getEntry, listEntries, upsertEntry } from "@/helpers/api";
import { Button } from "./Button";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import { EntryType } from "@/helpers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TypeCard: FC<{ type: EntryType }> = ({ type }) => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${type.id}`}>
      <ListCard>{type?.name ? type.name : "Untitled Type"}</ListCard>
    </Link>
  );
};

export const TypesManager: FC<{ types: { [key: string]: EntryType } }> = ({
  types,
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {types &&
        Object.entries(types)?.map(([typeId, typeData]) => {
          return <TypeCard key={typeId} type={typeData} />;
        })}
      <Link href={`${pathname}/create`}>
        <Button className="mt-4">Create Type</Button>
      </Link>
    </div>
  );
};
