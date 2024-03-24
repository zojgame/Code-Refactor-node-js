import { Schema, model } from "mongoose";

const history = new Schema({
  requests: { type: Array, default: [], required: true },
  user: { type: String, ref: "User", required: true },
});

const History = model("History", history);

export default History;
