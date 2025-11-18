import mongoose from "mongoose";
import dotenv from "dotenv";
import UserPost from "../src/api/models/UserPosts.js";

dotenv.config();

const topics = ["work_pressure", "relationships", "health", "finance", "motivation"];
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

async function generate() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Generating 24-hour demo data...");

  await UserPost.deleteMany();

  const now = new Date();

  for (let hour = 0; hour < 24; hour++) {
    const count = Math.floor(Math.random() * 5) + 5;

    for (let i = 0; i < count; i++) {
      const timestamp = new Date(now.getTime() - hour * 3600 * 1000);

      await UserPost.create({
        caption: `Sample post hour ${hour}`,
        image: "https://picsum.photos/300",
        topic: topics[Math.floor(Math.random() * topics.length)],
        location_geo: { type: "Point", coordinates: randomPoint() },
        ai_result: {
          emotion: emotions[Math.floor(Math.random() * emotions.length)],
          risk_level: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        },
        createdAt: timestamp,
        userId: "000000000000000000000001",
      });
    }
  }

  console.log("✔ 24-hour sample dataset created!");
  process.exit();
}

generate();
