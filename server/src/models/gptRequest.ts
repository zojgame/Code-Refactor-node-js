import { Schema, model } from "mongoose";
const gpt_request = new Schema({
  created: { type: Date, required: true, default: Date.now },
  message: { type: String, required: true },
  language: { type: String, required: true },
  username: { type: String, ref: "User", required: true },
  gptResponse: { type: Schema.Types.ObjectId, ref: "GPT_Response" },
});

const GPT_Request = model("GPT_Request", gpt_request);

export default GPT_Request;
