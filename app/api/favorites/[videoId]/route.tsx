import { NextRequest } from "next/server";
import clientPromise from "../../../../db/mongoConnection";

// add video to favorites
export async function POST(request: NextRequest) {
    try {
        const db = (await clientPromise).db("home-videos");

        const videoId = request.nextUrl.pathname.split('/').pop();

        // check if this id is already in the favorites collection
        const favorites = await db.collection("favorites").find({ videoId }).toArray();
        let result;

        if (favorites.length > 0) {
            // remove it from the favorites collection
            result = await db.collection("favorites").deleteOne({ videoId });
        } else {
            // add it to the favorites collection
            result = await db.collection("favorites").insertOne({ videoId });
        }

        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response("An error occurred", { status: 500 });
    }
}