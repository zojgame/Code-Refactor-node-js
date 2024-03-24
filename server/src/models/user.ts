import { Schema, model } from "mongoose";

const user = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  historyRequests: { type: Schema.Types.ObjectId, ref: "History" },
});

const User = model("User", user);
export default User;
