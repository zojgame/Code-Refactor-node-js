import ky from "ky";
import { SINGUP_API, SINGIN_API } from "./urls";

const singUp = async (username: string, password: string) => {
  const res = await ky
    .post(SINGUP_API, { json: { username, password } })
    .json();

  return res;
};

const singIn = async (username: string, password: string) => {
  const res = await ky
    .post(SINGIN_API, { json: { username, password } })
    .json();

  return res;
};

export { singUp, singIn };
