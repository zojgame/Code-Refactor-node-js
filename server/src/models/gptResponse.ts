import { Schema, model } from "mongoose";

const gpt_response = new Schema({
  message: { type: String, required: true },
  language: { type: String, required: true },
});

const GPT_Response = model("GPT_Response", gpt_response);

export default GPT_Response;
