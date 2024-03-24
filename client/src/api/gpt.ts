import { GPTRes } from "@/types";
import { GPT_REQUEST_API } from "./urls";
import ky from "ky";

const gptReq = async (
  tone: string,
  type: string,
  languageRequest: string,
  code: string,
  additional: string = "",
  token?: string
) => {
  if (token) {
    const res: GPTRes = await ky
      .post(GPT_REQUEST_API, {
        timeout: false,
        json: {
          tone: tone,
          type: type,
          code: code,
          languageRequest: languageRequest,
          additional: additional,
        },
        headers: {
          Authorization: token,
        },
      })
      .json();

    return res;
  }
  const res: GPTRes = await ky
    .post(GPT_REQUEST_API, {
      timeout: false,
      json: {
        tone: tone,
        type: type,
        code: code,
        languageRequest: languageRequest,
        additional: additional,
      },
    })
    .json();

  return res;
};

export { gptReq };
