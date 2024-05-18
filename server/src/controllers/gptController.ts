import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ChatCompletionMessageParam } from "openai/resources";
import { DecodedData } from "../types/decodedData";
import User from "../models/user";
import History from "../models/history";
import {
  LANGUAGES,
  TYPES,
  TONES,
  GPT_API,
  AUTH_TOKEN,
  ROLES,
} from "../consts/gpt";

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
как будто бы он находится в терминале, ничего лишнего добавлять не нужно, любые пояснения и свои коментарии добавляй в коментарии характерные для данного языка программирования, код должен быть как можно ${
  TONES[toneId]
}. Если кода нет выполни, то что передано в запросе, ответ должен быть ввиде кода и/или комментариев для данного языка.
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

    const secret = process.env.SECRET;
    const token = req.headers.authorization?.split(" ")[1];
    const decodedData = token ? jwt.verify(token, secret!) : null;

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
          const history = new History({
            requestCode: result,
            responseCode: code,
            user: username,
            progLang: language,
          });
          history.save();
        }
      }

      res.status(200).json({ message: result });
    } catch (error) {
      console.log("error", error);
    }
  }

  async getHistory(req: Request, res: Response) {
    try {
      const secret = process.env.SECRET;
      const token = req.headers.authorization?.split(" ")[1];
      const decodedData = token ? jwt.verify(token, secret!) : null;
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
