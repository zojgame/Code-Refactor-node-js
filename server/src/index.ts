import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import express, { json } from "express";
import { GPT_Router } from "./router";
import { Auth_Router } from "./router/authRouter";

const database_url =
  process.env.DATABASE ||
  "mongodb+srv://zogame002:admin@cluster0.tfteftp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use("/gpt-api", GPT_Router);
app.use("/auth", Auth_Router);

app.get("/", (_req, res) => {
  res.json({ ok: 1 });
});

const start = async () => {
  try {
    await mongoose.connect(database_url);
    app.listen(port, () => console.log(`server started on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
