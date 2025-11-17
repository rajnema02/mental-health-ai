import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import UserPost from "../src/api/models/UserPosts.js";
import User from "../src/api/models/User.js";

const DATABASE_URL = process.env.DATABASE_URL;

const emotions = ["happy", "sad", "fear", "anger", "neutral"];
const riskLevels = ["low", "medium", "high"];
const captions = [
  "Feeling stressed today",
  "What a wonderful morning",
  "Worried about my exams",
  "Feeling anxious lately",
  "Trying to stay positive",
];

// Fallback placeholder image
const SAMPLE_IMAGE =
  "https://picsum.photos/300/300?random=" + Math.floor(Math.random() * 1000);

async function startLiveGenerator() {
  if (!DATABASE_URL) {
    console.log("❌ ERROR: DATABASE_URL is missing in .env");
    process.exit(1);
  }

  await mongoose.connect(DATABASE_URL);
  console.log("Mongo Connected — LIVE data generator running...\n");

  // Ensure at least 1 user exists
  let user = await User.findOne();
  if (!user) {
    user = await User.create({
      name: "Auto User",
      email: "auto@example.com",
      password: "123456",
    });
    console.log("✔ Created Auto User:", user._id);
  }

  setInterval(async () => {
    try {
      const emotion = emotions[Math.floor(Math.random() * emotions.length)];
      const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      const caption = captions[Math.floor(Math.random() * captions.length)];

      const newPost = await UserPost.create({
        userId: user._id,
        caption,
        image: SAMPLE_IMAGE, // required
        ai_result: {
          emotion,
          risk_level: risk,
        },
      });

      console.log(
        `✔ New LIVE post added → Emotion: ${emotion}, Risk: ${risk}, Caption: "${caption}"`
      );
    } catch (err) {
      console.error("❌ ERROR inserting data:", err);
    }
  }, 3000); // every 3 seconds
}

startLiveGenerator();
