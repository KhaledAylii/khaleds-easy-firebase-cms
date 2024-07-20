"use client";
import { deleteEntry, getEntry, listEntries, upsertEntry } from "@/helpers/api";
import { Button } from "./Button";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import {
  FC,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ListCard } from "./ListCard";
import { CollectionEntry } from "@/helpers/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { invalidatePage } from "@/helpers/actions";

const EntryCard: FC<{ entry: CollectionEntry }> = ({ entry }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    deleteEntry(entry.id, `collections_entries_${entry.collectionId}`)
      .then(() => {
        return invalidatePage(pathname);
      })
      .then(() => {
        router.refresh();
      });
  };

  return (
    <Link href={`${pathname}/${entry.id}`}>
      <ListCard>
        <div className="flex flex-row justify-between items-center gap-2">
          <span>{entry?.name ? entry.name : entry.id}</span>
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

export const EntriesManager: FC<{
  entries: { [key: string]: CollectionEntry };
}> = ({ entries }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {entries &&
        Object.entries(entries)?.map(([entryId, entryData]) => {
          return <EntryCard key={entryId} entry={entryData} />;
        })}
      <div className="flex flex-row gap-2">
        <Link href={`${pathname}/create`}>
          <Button className="mt-4">Create Entry</Button>
        </Link>
      </div>
    </div>
  );
};
