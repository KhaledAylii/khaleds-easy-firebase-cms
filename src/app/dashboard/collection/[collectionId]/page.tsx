import { CollectionsManager } from "@/components/CollectionsManager";
import { EntriesManager } from "@/components/EntriesManager";
import { listEntries } from "@/helpers/api";
import { CollectionEntry } from "@/helpers/types";

export default async function Page({
  params,
}: {
  params: { collectionId: string };
}) {
  const entries = await listEntries<CollectionEntry>(
    `collections_entries_${params.collectionId}`,
    true
  );
  if (!entries) return null;
  return <EntriesManager entries={entries} />;
}
