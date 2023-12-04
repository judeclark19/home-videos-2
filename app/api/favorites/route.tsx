import { NextRequest } from "next/server";
import clientPromise from "../../../db/mongoConnection";
import { ObjectId } from "mongodb";

// get Favorites collection
export async function GET(request: NextRequest) {
    try {
        const db = (await clientPromise).db("home-videos");
        // Get all favorite documents
        const favoriteDocs = await db.collection("favorites").find().toArray();

        // Extract the _id values from the favorite documents
        const favoriteIds = favoriteDocs.map(doc => new ObjectId(doc.videoId));

        const aggregationStages: any[] = [
            { $match: { _id: { $in: favoriteIds } } },
            {
                $lookup: {
                    from: "tags",
                    localField: "tags",
                    foreignField: "_id",
                    as: "tagDetails"
                }
            },
            {
                $lookup: {
                    from: "locations", // Assuming your locations collection is named "locations"
                    localField: "location", // The field in the videos collection
                    foreignField: "_id", // The field in the locations collection
                    as: "locationDetails"
                }
            },
            {
                $lookup: {
                    from: "people", // Assuming your people collection is named "people"
                    localField: "people", // The field in the videos collection that contains an array of people ids
                    foreignField: "_id", // The field in the people collection to match with
                    as: "peopleDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    url: 1,
                    sequence: 1,
                    title: 1,
                    date: 1,
                    duration: 1,
                    beginning: 1,
                    description: 1,
                    partNumber: 1,
                    notes: 1,
                    tags: {
                        $map: {
                            input: "$tagDetails",
                            as: "tag",
                            in: "$$tag.tagName" // Maps each item in the tagDetails array to its name field
                        }
                    },
                    location: { $arrayElemAt: ["$locationDetails.locationName", 0] }, // Assuming location name is stored in "name" field
                    people: {
                        $map: {
                            input: "$peopleDetails",
                            as: "person",
                            in: "$$person.name" // Maps each item in the peopleDetails array to its name field
                        }
                    }
                }
            },
            { $sort: { sequence: 1 } },

        ];

        // get all videos that are in the favorites collection
        const videos = await db.collection("videos").aggregate(aggregationStages).toArray();

        return new Response(JSON.stringify(videos), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response("An error occurred", { status: 500 });
    }
}