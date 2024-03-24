import ky from "ky";
import { USER_HISTORY_API } from "./urls";

const getHistory = async (token: string) => {
  const res = await ky
    .get(USER_HISTORY_API, { headers: { Authorization: token } })
    .json();

  return res;
};

export { getHistory };
