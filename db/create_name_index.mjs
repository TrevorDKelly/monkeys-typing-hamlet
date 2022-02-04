import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/monkeys");

async function run() {
  try {
    await client.connect();
    const db = client.db("monkeys");
    const collection = db.collection("monkeys");

    const result = await collection.createIndex({ name: "text" }, { unique: true });

    console.log(`index created: ${result}`);
  } finally {
    await client.close();
  }
}
run().catch(e => console.log(e));
