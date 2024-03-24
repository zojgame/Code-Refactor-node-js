import { Types } from "mongoose";

type DecodedData = {
  id: Types.ObjectId;
  username: string;
};

export type { DecodedData };
