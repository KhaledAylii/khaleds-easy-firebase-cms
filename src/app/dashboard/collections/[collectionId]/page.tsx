import { EditCollectionView } from "@/components/EditCollectionView";
import { EditTypeView } from "@/components/EditTypeView";
import { getEntry, listEntries } from "@/helpers/api";
import { Entry, EntryCollection, EntryType } from "@/helpers/types";

export default async function Page({
  params,
}: {
  params: { collectionId: string };
}) {
  const collections = await getEntry<EntryCollection>(
    params.collectionId,
    "collections",
    true
  );
  const types = await listEntries<EntryType>("types", true);
  if (!types) return null;
  if (!collections) return null;
  return <EditCollectionView existingCollection={collections} types={types} />;
}
