import { Schema, model } from "mongoose";

const history = new Schema({
  dateTimeCreate: { type: Date, required: true, default: Date.now },
  requestCode: { type: String, required: true },
  responseCode: { type: String, required: true },
  user: { type: String, ref: "User", required: true },
  progLang: { type: String, required: true },
});

const History = model("History", history);

export default History;
