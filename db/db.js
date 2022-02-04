const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors());

client = new MongoClient(process.env.DB_LOCAL);

app.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("monkeys");
    const collection = db.collection("monkeys");
    const answer = await collection.find().toArray();

    res.status(200).json(answer)
  } catch (e) {
    res.status(400).json({error: e.message});
  } finally {
    await client.close();
  }
});

app.post("/update/:name", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("monkeys");
    const collection = db.collection("monkeys");

    const increments = {
      presses: req.body.presses,
      correct: req.body.correct,
    };

    Object.keys(req.body.hits).forEach( reach => {
      increments[`hits.${reach}`] = req.body.hits[reach];
    });

    const answer = await collection.updateOne(
      { name: req.params.name },
      {
        $inc: increments,
        $max: {
          best: req.body.best,
        }
    });

    res.status(200).send();
  } catch (e) {
    res.status(400).json({error: e.message});
  } finally {
    await client.close();
  }
});

app.post("/new", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("monkeys");
    const collection = db.collection("monkeys");

    const answer = await collection.insertOne({name: req.body.name})
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  } finally {
    await client.close();
  }
});

/*
return leaders
[
  {
    category: "",
    leaders: [{rank: 1, value: ""}, ...],
  }
]
*/



app.listen(3001,  () => console.log(`listening on port 3001`));
