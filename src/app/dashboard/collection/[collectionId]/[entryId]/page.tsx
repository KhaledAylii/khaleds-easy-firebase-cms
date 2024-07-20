import { EditCollectionEntryView } from "@/components/EditCollectionEntryView";
import { EditCollectionView } from "@/components/EditCollectionView";
import { getEntry, listEntries } from "@/helpers/api";
import { CollectionEntry, EntryCollection, EntryType } from "@/helpers/types";

export default async function Page({
  params,
}: {
  params: { collectionId: string; entryId: string };
}) {
  const collection = await getEntry<EntryCollection>(
    params.collectionId,
    "collections",
    true
  );
  if (!collection) return null;
  const type = await getEntry<EntryType>(collection?.type, "types", true);
  if (!type) return null;
  const existingEntry = await getEntry<CollectionEntry>(
    params.entryId,
    `collections_entries_${params.collectionId}`,
    true
  );
  console.log(existingEntry);
  if (!existingEntry) return null;
  return (
    <EditCollectionEntryView
      type={type}
      collection={collection}
      existingEntry={existingEntry}
    />
  );
}
