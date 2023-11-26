import clientPromise from "@/db/mongoconnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getAllVideos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db("home-videos"); // Replace with your database name

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

    // Example: Fetch data from a collection
    const data = await db
      .collection("videos")
      .aggregate(aggregationStages)
      .toArray();

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}
