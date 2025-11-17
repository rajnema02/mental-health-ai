import mongoose from "mongoose";
import dotenv from "dotenv";
import UserPost from "../src/api/models/UserPosts.js";

dotenv.config();

// Emotions likely to vary across hours
const hourlyEmotionWeights = [
  "sad","sad","sad","fear","fear","happy","happy","happy",
  "neutral","neutral","neutral","happy","happy","motivation",
  "motivation","stress","stress","anger","anger","sad","sad","fear","fear","sad"
];

const topics = ["work_pressure", "relationships", "health", "finance", "motivation"];
const riskLevels = ["low", "medium", "high"];

function randomPoint() {
  const baseLat = 23.2599;
  const baseLng = 77.4126;
  return [
    baseLng + (Math.random() - 0.5) * 0.1,
    baseLat + (Math.random() - 0.5) * 0.1
  ];
}

async function generate() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Mongo Connected — generating 24-hr dataset...");

  const userId = "691b20104f2645528947ee2f"; // Your real userId
  await UserPost.deleteMany();

  const now = new Date();

  for (let hour = 0; hour < 24; hour++) {
    const count = Math.floor(Math.random() * 4) + 2; // 2–6 posts per hour

    for (let i = 0; i < count; i++) {
      const ts = new Date(now.getTime() - (hour * 60 * 60 * 1000));

      await UserPost.create({
        caption: "Hourly auto-sample",
        image: "/uploads/sample.jpg",
        emotion: hourlyEmotionWeights[hour],
        topic: topics[Math.floor(Math.random() * topics.length)],
        risk_level: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        userId,
        location_geo: { type: "Point", coordinates: randomPoint() },
        createdAt: ts
      });
    }
  }

  console.log("✔ 24-hour sample dataset created!");
  process.exit();
}

generate();
