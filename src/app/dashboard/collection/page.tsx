import { CollectionsManager } from "@/components/CollectionsManager";
import { listEntries } from "@/helpers/api";
import { EntryType } from "@/helpers/types";

export default async function Page() {
  const collections = await listEntries<EntryType>("collections", true);
  if (!collections) return null;
  return <CollectionsManager collections={collections} />;
}
