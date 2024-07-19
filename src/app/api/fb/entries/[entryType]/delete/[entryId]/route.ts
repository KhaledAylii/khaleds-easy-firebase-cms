import { db } from "@/helpers/firebase";

export async function POST(
  req: Request,
  { params }: { params: { entryType: string; entryId: string } }
) {
  try {
    const { entryId, entryType } = params;
    if (!entryId || !entryType) {
      throw new Error("no page id given");
    }
    const entryRef = db.ref(`${entryType}`).child(`${entryId}`);
    let res: Response = Response.json(
      {
        error: `Entry does not exist with Id $${entryType}/${entryId}`,
      },
      { status: 500 }
    );
    await entryRef.remove(() => {
      res = Response.json({}, { status: 200 });
    });
    return res;
  } catch (err) {
    return Response.json({ error: "failed to load data" }, { status: 500 });
  }
}
