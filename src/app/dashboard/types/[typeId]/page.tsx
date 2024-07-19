import { EditTypeView } from "@/components/EditTypeView";
import { getEntry } from "@/helpers/api";
import { EntryType } from "@/helpers/types";

export default async function Page({ params }: { params: { typeId: string } }) {
  const type = await getEntry<EntryType>(params.typeId, "types", true);
  if (!type) return null;
  return <EditTypeView existingType={type} />;
}
