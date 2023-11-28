import { NextRequest } from "next/server";
import clientPromise from "../../../db/mongoConnection";

export async function POST(request: NextRequest) {
    try {
        const db = (await clientPromise).db("home-videos");

        const body = await request.json();

        const result = await db.collection("messages").insertOne(body);

        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response("An error occurred", { status: 500 });
    }
}