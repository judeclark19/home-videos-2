import { NextRequest } from 'next/server';
import clientPromise from '../../../db/mongoConnection';

export async function GET(request: NextRequest) {
    try {
        const db = (await clientPromise).db("home-videos");

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;


        const aggregationStages: any[] = [
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
            { $sort: { date: 1 } },
            { $skip: skip },
            { $limit: limit }
        ];

        const videos = await db
            .collection("videos")
            .aggregate(aggregationStages)
            .toArray();

        const totalVideos = await db.collection("videos").countDocuments();

        return new Response(JSON.stringify({ videos, totalVideos }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: (e as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}