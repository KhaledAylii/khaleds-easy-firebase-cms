import { EditCollectionEntryView } from "@/components/EditCollectionEntryView";
import { EditCollectionView } from "@/components/EditCollectionView";
import { getEntry, listEntries } from "@/helpers/api";
import { EntryCollection, EntryType } from "@/helpers/types";

export default async function Page({
  params,
}: {
  params: { collectionId: string };
}) {
  const collection = await getEntry<EntryCollection>(
    params.collectionId,
    "collections",
    true
  );
  console.log(collection);
  if (!collection) return null;
  const type = await getEntry<EntryType>(collection?.type, "types", true);
  console.log(type);
  if (!type) return null;
  return <EditCollectionEntryView type={type} collection={collection} />;
}
