import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//app.use();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Listening to port ${PORT} ...`);
});

app.listen();
