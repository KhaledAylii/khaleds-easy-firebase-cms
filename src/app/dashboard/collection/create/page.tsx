import { EditCollectionView } from "@/components/EditCollectionView";
import { listEntries } from "@/helpers/api";
import { EntryType } from "@/helpers/types";

export default async function Page() {
  const types = await listEntries<EntryType>("types", true);
  if (!types) return null;
  return <EditCollectionView types={types} />;
}
