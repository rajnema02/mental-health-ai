import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import UserPost from "../src/api/models/UserPosts.js";
import User from "../src/api/models/User.js";

const emotions = ["happy", "sad", "fear", "anger", "neutral"];
const riskLevels = ["low", "medium", "high"];
const topics = ["work_pressure", "relationships", "health", "finance", "motivation"];
const captions = [
  "Feeling stressed today",
  "What a wonderful morning",
  "Worried about my exams",
  "Feeling anxious lately",
  "Trying to stay positive"
];

function randomLocation() {
  const baseLat = 23.2599;
  const baseLng = 77.4126;
  return [
    baseLng + (Math.random() - 0.5) * 0.1,
    baseLat + (Math.random() - 0.5) * 0.1,
  ];
}

async function start() {
  await mongoose.connect(process.env.DATABASE_URL);

  let user = await User.findOne();
  if (!user) {
    user = await User.create({
      name: "Auto User",
      email: "auto@example.com",
      password: "123456",
    });
  }

  console.log("LIVE generator running...");

  setInterval(async () => {
    try {
      const post = await UserPost.create({
        userId: user._id,
        caption: captions[Math.floor(Math.random() * captions.length)],
        image: "https://picsum.photos/300",
        topic: topics[Math.floor(Math.random() * topics.length)],
        ai_result: {
          emotion: emotions[Math.floor(Math.random() * emotions.length)],
          risk_level: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        },
        location_geo: {
          type: "Point",
          coordinates: randomLocation(),
        },
      });

      console.log("✔ MAP POINT ADDED:", post.location_geo.coordinates);
    } catch (err) {
      console.log("❌ ERROR:", err);
    }
  }, 3000);
}

start();
