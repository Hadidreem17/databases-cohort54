require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("bob_ross_episodes");

  const allEpisodes = await collection.find().toArray();
  console.log("Total:", allEpisodes.length);

  const newEpisode = await collection.insertOne({
    title: "My Episode",
    season: 99,
    episode: 1,
  });
  console.log("Inserted:", newEpisode.insertedId);

  await collection.updateOne(
    { _id: newEpisode.insertedId },
    { $set: { title: "Updated Episode Title" } }
  );

  await collection.deleteOne({ _id: newEpisode.insertedId });

  await client.close();
}

main();
