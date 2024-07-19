import { NextApiRequest, NextApiResponse } from "next";
import { storage } from "@/helpers/firebase";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id, type } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const file = req.body.image as Buffer;

    if (!id || !file || !type) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    let fileRef = storage.file(`images/${id as string}`);

    // Upload the new file, replacing the existing one
    await fileRef.save(file, {
      public: true,
      metadata: {
        contentType: type as string, // You can adjust the content type based on your image format
      },
    });

    fileRef = storage.file(`images/${id as string}`);

    return res.status(200).json({
      message: "File replaced successfully",
      url: fileRef.publicUrl(),
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
