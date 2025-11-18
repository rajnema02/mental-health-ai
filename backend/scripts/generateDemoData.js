import mongoose from "mongoose";
import dotenv from "dotenv";
import UserPost from "../src/api/models/UserPosts.js";
import User from "../src/api/models/User.js";

dotenv.config();

const topics = ["health", "finance", "relationships", "motivation", "work_pressure"];
const emotions = ["sad", "happy", "anger", "fear", "neutral"];
const riskLevels = ["low", "medium", "high"];

function randomPoint() {
  const baseLat = 23.2599;
  const baseLng = 77.4126;
  return [
    baseLng + (Math.random() - 0.5) * 0.1,
    baseLat + (Math.random() - 0.5) * 0.1,
  ];
}

async function start() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("DB Connected.");

  let user = await User.findOne();
  if (!user) {
    user = await User.create({
      name: "Demo User",
      email: "demo@example.com",
      password: "123456",
    });
  }

  await UserPost.deleteMany();
  console.log("Cleared old posts.");

  for (let i = 0; i < 200; i++) {
    await UserPost.create({
      userId: user._id,
      caption: "Demo post " + i,
      image: "https://picsum.photos/300",
      topic: topics[Math.floor(Math.random() * topics.length)],
      ai_result: {
        emotion: emotions[Math.floor(Math.random() * emotions.length)],
        risk_level: riskLevels[Math.floor(Math.random() * riskLevels.length)],
      },
      location_geo: { type: "Point", coordinates: randomPoint() },
    });
  }

  console.log("✔ Demo map data generated!");
  process.exit();
}

start();
