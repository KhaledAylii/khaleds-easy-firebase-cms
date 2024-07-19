import { db } from "@/helpers/firebase";

export async function GET(
  req: Request,
  { params }: { params: { entryType: string; entryId: string } }
) {
  try {
    const { entryId, entryType } = params;
    if (!entryId || !entryType) {
      throw new Error("no page id given");
    }
    const entryRef = db.ref(`${entryType}`).child(`${entryId}`);

    await entryRef.on("value", (entrySnapshot) => {
      if (entrySnapshot.exists()) {
        return Response.json({ data: entrySnapshot.val() }, { status: 200 });
      } else {
        return Response.json(
          {
            error: `Entry does not exist with Id $${entryType}/${entryId}`,
          },
          { status: 500 }
        );
      }
    });
  } catch (err) {
    console.log("failed", err);
    return Response.json({ error: "failed to load data" }, { status: 500 });
  }
}
