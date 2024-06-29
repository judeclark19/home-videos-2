import { NextRequest } from "next/server";
import clientPromise from "../../../db/mongoConnection";
import nodemailer from "nodemailer";

const { GMAIL_USER, GMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use port 465 for secure connections
  secure: true, // Use true since port 465 uses SSL
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const mailOptions = {
  from: GMAIL_USER,
  to: GMAIL_USER,
  subject: "New message from home-videos",
  text: "New message from home-videos"
};

export async function POST(request: NextRequest) {
  try {
    const db = (await clientPromise).db("home-videos");

    const body = await request.json();
    const result = await db.collection("messages").insertOne(body);

    mailOptions.text = `${JSON.stringify(body, null, 2)}`;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
}
