const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors());

const pool = new Pool({
  port: process.env.DBPORT,
  host: process.env.DBHOST,
  database: process.env.DATABASE,
  user: "test",
  password: process.env.DBPASSWORD,
});

app.get("/", async (req, res) => {
  const query = "SELECT * FROM monkeys;";

  let client;
  try {
    client = await pool.connect();
    const answer = await client.query(query);
    res.status(200).json(answer.rows)
    client.release();
  } catch (e) {
    res.status(400).json({error: e.message});
    client.release();
  }
});

app.post("/:id", async (req, res) => {
  const query = "UPDATE monkeys SET presses = presses + $1, correct = correct + $2, best = GREATEST(best, $3) WHERE id = $4"
  let data = [req.body.presses, req.body.correct, req.body.best, req.params.id];
  data = data.map(val => parseInt(val, 10));

  let client;
  try {
    client = await pool.connect();
    const answer = await client.query(query, data);
    res.status(204).send();
    client.release();
  } catch (e) {
    res.status(400).json({error: e.message});
    client.release();
  }
});

app.listen(3001,  () => console.log(`listening on port ${process.env.DBPORT}`));
