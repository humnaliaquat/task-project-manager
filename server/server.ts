import { Request, Response } from "express";
import dotenv from "dotenv"; dotenv.config();
const express = require("express");
const app = express();

require("./models/db.ts")

const Port = process.env.PORT || 5000;
app.get("/ping", (req: Request, res: Response) => {
  res.send("PONG");
});
app.listen(Port, () => {
  console.log("Server is running");
});
