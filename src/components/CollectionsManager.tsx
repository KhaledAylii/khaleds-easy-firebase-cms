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
import { EntryType } from "@/helpers/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { invalidatePage } from "@/helpers/actions";

const CollectionCard: FC<{ collection: EntryType }> = ({ collection }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    deleteEntry(collection.id, "collections")
      .then(() => {
        return invalidatePage(pathname);
      })
      .then(() => {
        router.refresh();
      });
  };

  return (
    <Link href={`${pathname}/${collection.id}`}>
      <ListCard>
        <div className="flex flex-row justify-between items-center gap-2">
          <span>
            {collection?.name ? collection.name : "Untitled Collection"}
          </span>
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

export const CollectionsManager: FC<{
  collections: { [key: string]: EntryType };
}> = ({ collections }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {collections &&
        Object.entries(collections)?.map(([collectionId, collectionData]) => {
          return (
            <CollectionCard key={collectionId} collection={collectionData} />
          );
        })}
      <div className="flex flex-row gap-2">
        <Link href={`${pathname}/create`}>
          <Button className="mt-4">Create Collection</Button>
        </Link>
      </div>
    </div>
  );
};
