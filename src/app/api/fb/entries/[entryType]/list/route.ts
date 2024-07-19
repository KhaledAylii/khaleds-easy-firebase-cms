import { db } from "@/helpers/firebase";

export async function GET(
  req: Request,
  { params }: { params: { entryType: string } }
) {
  try {
    const { entryType } = params;
    if (!entryType) {
      throw new Error("no entry type given");
    }
    const entryRef = db.ref(`${entryType}`);

    let res: Response = Response.json(
      {
        error: `Entries don't exist for type $${entryType}`,
      },
      { status: 500 }
    );
    await entryRef.on("value", (entrySnapshot) => {
      if (entrySnapshot.exists()) {
        res = Response.json({ data: entrySnapshot.val() }, { status: 200 });
      }
    });
    return res;
  } catch (err) {
    console.log("failed", err);
    return Response.json({ error: "failed to load data" }, { status: 500 });
  }
}
