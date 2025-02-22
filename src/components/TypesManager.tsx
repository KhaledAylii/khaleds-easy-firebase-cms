"use client";
import { deleteEntry, getEntry, listEntries, upsertEntry } from "@/helpers/api";
import { Button } from "./Button";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ListCard } from "./ListCard";
import { EntryType } from "@/helpers/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { invalidatePage } from "@/helpers/actions";

const TypeCard: FC<{ type: EntryType }> = ({ type }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    deleteEntry(type.id, "types")
      .then(() => {
        return invalidatePage(pathname);
      })
      .then(() => {
        router.refresh();
      });
  };
  return (
    <Link href={`${pathname}/${type.id}`}>
      <ListCard>
        <div className="flex flex-row justify-between items-center gap-2">
          <span>{type?.name ? type.name : "Untitled Type"}</span>
          <div className="flex flex-row gap-2">
            <Button onClick={handleDelete} variant="danger">
              Delete
            </Button>
            <Button>Edit</Button>
          </div>
        </div>
      </ListCard>
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
