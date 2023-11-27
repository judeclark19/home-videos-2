import clientPromise from "@/db/mongoconnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function postMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("home-videos"); // Replace with your database name
    const collection = db.collection("messages"); // Replace with your collection

    const result = await collection.insertOne(req.body);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}
