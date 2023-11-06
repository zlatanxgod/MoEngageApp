import http from "http";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import validateQueryParams from "./validateQuery.js";
import cors from "cors";

const API_URL = "https://api.openbrewerydb.org/v1";
const fetchData = async (req, res) => {
  try {
    const url = API_URL + req.url;
    console.log("This is url", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Eroor occ hitting API");
  }
};

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/breweries", validateQueryParams, async (req, res) => {
  const response = await fetchData(req, res);

  //console.log(response);

  res.status(200).json(response);
});

//app.use();

const PORT = process.env.PORT || 3001;

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Listening to port ${PORT} ...`);
});

app.listen();
