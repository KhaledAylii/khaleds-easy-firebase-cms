import { db } from "@/helpers/firebase";

export async function POST(
  req: Request,
  { params }: { params: { entryType: string; entryId: string } }
) {
  try {
    const { entryId, entryType } = params;
    const body = await req.json();
    const newData: { content: string } = body as {
      content: string;
    };
    if (!newData.content || !entryId || !entryType) {
      return Response.json(
        { error: "Bad Input, must include content and entry id" },
        { status: 500 }
      );
    }

    const documentRef = db.ref(entryType as string).child(entryId as string);
    await documentRef.set({ content: newData.content }); // Use merge: true to update existing fields

    return Response.json(
      { message: "Document updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
