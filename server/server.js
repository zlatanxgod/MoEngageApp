import http from "http";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import validateQueryParams from "./validateQuery.js";
import cors from "cors";
import mongoose from "mongoose";

import moengageMongo from "./moengage.mongo.js";

const API_URL = "https://api.openbrewerydb.org/v1";
const MONGO_URL =
  "mongodb+srv://abhishantsingh05:zlatan10@cluster0.kj2xaiu.mongodb.net/moengage?retryWrites=true&w=majority";
const fetchData = async (req, res) => {
  try {
    const url = API_URL + req.url;
    const response = await axios.get(url);
    //console.log("======>", response.data);
    const new_return = Promise.all(
      await response.data.map(async (item) => {
        const rec = await moengageMongo.findOne({
          id: item.id,
        });

        if (!rec) return item;
        //console.log(rec.rating);
        item.rating = rec.rating;
        item.review = rec.review;
        //console.log("=====>", item);
        return item;
      })
    );
    //console.log(new_return);
    console.log("whaaaat", new_return);
    return new_return;
  } catch (error) {
    console.log("Eroor occ hitting API", error);
  }
};

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/breweries", validateQueryParams, async (req, res) => {
  const response = await fetchData(req, res);
  res.status(200).json(response);
});

app.post("/ratingandreview", async (req, res) => {
  //console.log(req.body);
  try {
    await moengageMongo.updateOne({ id: req.body.id }, req.body, {
      upsert: true,
    });
  } catch (error) {
    console.log("Insertion failed in DB");
    res.status(500);
  }
  res.status(200).send(req.body);
});

const PORT = process.env.PORT || 3001;
mongoose.connection.once("open", () => {
  console.log("Connection to MDB ready");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

const server = http.createServer(app).listen(PORT, async () => {
  await mongoose.connect(MONGO_URL);
  console.log(`Listening to port ${PORT} ...`);
});

app.listen();
