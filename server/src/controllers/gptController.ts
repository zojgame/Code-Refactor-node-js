import jwt from "jsonwebtoken";
import User from "../models/user";
import { Request, Response } from "express";
import { ChatCompletionMessageParam } from "openai/resources";
import { secret } from "../config";
import { DecodedData } from "../types";
import History from "../models/history";

const AUTH_TOKEN = "Bearer bb1a7ff1-b839-4324-939c-7a478b69aab7";

const GPT_API = "https://api.caipacity.com/v1/chat/completions";

type ROLE = "assistant" | "system" | "user";

const ROLES: Record<string, ROLE> = {
  ASSINSTANT: "assistant",
  SYSTEM: "system",
  USER: "user",
};

const TONES = ["профессиональнее", "понятнее"];

const TYPES = [
  "пояснить код коментариями",
  "написать код как можно короче",
  "удалить лишнии коментарии",
  "переименовать переменные",
  "сделать рефакторинг, переименовав все переменные и функции методом camel case",
  "сделать рефакторинг, переименовав все переменные и функции методом snake case",
];

const LANGUAGES = ["javascript", "c", "swift", "typescript", "java"];

const getMessage = (
  code: string,
  languageId: number,
  typeId: number,
  toneId: number,
  additional: string
) => `
Тебе подаётся код другого разработчика на языке ${
  LANGUAGES[languageId]
}, тебе нужно ${TYPES[typeId]}, свой ответ представь только в виде кода, 
как будто бы он находится в терминале, ничего лишнего добавлять не нужно, свои коментарии добавляй в коментарии характерные для данного языка программирования, код должен быть как можно ${
  TONES[toneId]
}.
${
  additional === ""
    ? ""
    : `Также вот пожелания к коду, которые нужно учесть: "${additional}"`
}

Вот код:
"${code}"
`;

class GPTController {
  async createRequest(req: Request, res: Response) {
    const { code, type, tone, language, additional } = req.body;

    const messages: ChatCompletionMessageParam[] = [
      {
        role: ROLES.SYSTEM,
        content: `Ты опытный senior разработчик на языке ${LANGUAGES[language]}, ты используешь лучшие практики для рефакторинга и разработки кода`,
      },
      {
        role: ROLES.USER,
        content: getMessage(code, language, type, tone, additional),
      },
    ];

    const token = req.headers.authorization?.split(" ")[1];
    const decodedData = token ? jwt.verify(token, secret) : null;

    const data = {
      model: "gpt-3.5-turbo",
      messages: messages,
    };
    try {
      const response = await fetch(GPT_API, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const result = (await response.json()).choices[0].message.content;

      if (decodedData) {
        const { username } = decodedData as DecodedData;
        const candidate = await User.findOne({ username });

        if (candidate) {
          // const gptRes = new GPT_Response({
          //   message: result,
          //   language: language,
          // });
          // await gptRes.save();

          // const gptReq = new GPT_Request({
          //   message: result,
          //   code: code,
          //   language: language,
          //   username: username,
          //   gptResponse: gptRes,
          // });
          // await gptReq.save();

          // const userHistory = candidate.historyRequests;
          // const history = await History.findOne({ user: username });
          const history = new History({
            requestCode: result,
            responseCode: code,
            user: username,
            progLang: language,
          });
          history.save();
          // if (history) {
          //   history.requests.push(gptReq);
          //   await history.save();
          // } else {
          //   const his = new History({
          //     user: username,
          //   });
          //   his.save();
          // }
        }
      }

      res.status(200).json({ message: result });
    } catch (error) {
      console.log("error", error);
    }
  }

  async getHistory(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const decodedData = token ? jwt.verify(token, secret) : null;
      if (decodedData) {
        const { username } = decodedData as DecodedData;
        const candidate = await User.findOne({ username });

        if (candidate) {
          const history = await History.find({ user: username });
          if (history) {
            res.status(200).json({ history: history });
          } else {
            res.status(204).json({ message: "История пуста" });
          }
        }
      } else {
        res.status(401).json({ message: "Пользователь не авторизован" });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}

const GPT_controller = new GPTController();

export { GPT_controller };
