const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const hostname = "127.0.0.1";
const Tweet = require("./models/Tweet");

const mongoURL = `mongodb://${hostname}/twitterdb`;
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is home root!",
  });
});

app.get("/tweets", (req, res) => {
  Tweet.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/tweets", (req, res) => {
  const name = req.body.name;
  const content = req.body.content;

  const tweet = new Tweet({
    name,
    content,
  });

  tweet
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
