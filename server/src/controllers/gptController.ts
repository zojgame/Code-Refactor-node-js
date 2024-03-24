import OpenAI from "openai";
import jwt from "jsonwebtoken";
import GPT_Request from "../models/gptRequest";
import User from "../models/user";
import { Request, Response } from "express";
import { ChatCompletionMessageParam } from "openai/resources";
import { secret } from "../config";
import { DecodedData } from "../types";
import GPT_Response from "../models/gptResponse";
import History from "../models/history";

const openai = new OpenAI({
  apiKey: "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",
});

type ROLE = "assistant" | "system" | "user";

const ROLES: Record<string, ROLE> = {
  ASSINSTANT: "assistant",
  SYSTEM: "system",
  USER: "user",
};

const getMessage = (m: string) => `
    Напиши на основе этих тезисов эмоциональную историю: ${m}

    Это тезисы для описания ключевых моментов дня, необходимо написать историю,
    блягодаря которым я запомню ее, много теста не нужно главное чтобы были эмоции
`;

class GPTController {
  // getAllProducts(req: Request, res: Response): void {
  //   const limit = Number(req.query.limit) || 5;
  //   const page = Number(req.query.page) || 1;

  //   const currentProducts = PRODUCTS.slice((page - 1) * limit, page * limit);
  //   try {
  //     res.status(200).json(currentProducts);
  //   } catch (error) {
  //     res.status(404);
  //   }
  // }

  // getProduct(req: Request, res: Response): void {
  //   const id = req.params.id;
  //   const currentProduct = PRODUCTS.find(
  //     (product) => product.id === Number(id)
  //   );
  //   if (currentProduct) {
  //     res.status(200).json(currentProduct);
  //   } else {
  //     res.status(404).json({ message: "Товар не найден" });
  //   }
  // }

  async createRequest(req: Request, res: Response) {
    const { message, language } = req.body;

    const messages: ChatCompletionMessageParam[] = [
      {
        role: ROLES.SYSTEM,
        content:
          "Ты опытный копирайтер который пишет краткие эмоциональные статьи",
      },
      {
        role: ROLES.USER,
        content: getMessage(message),
      },
    ];

    const token = req.headers.authorization?.split(" ")[1];
    const decodedData = token ? jwt.verify(token, secret) : null;

    try {
      const chatCompletion = openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });

      const response = (await chatCompletion).choices[0].message.content;

      if (decodedData) {
        const { username } = decodedData as DecodedData;
        const candidate = await User.findOne({ username });

        if (candidate) {
          const gptRes = new GPT_Response({
            message: response,
            language: language,
          });
          await gptRes.save();

          const gptReq = new GPT_Request({
            message: message,
            language: language,
            username: username,
            gptResponse: gptRes,
          });
          await gptReq.save();

          const userHistory = candidate.historyRequests;
          if (userHistory) {
            const history = await History.findOne({ user: username });
            console.log("first", history);
            console.log("userHistory", userHistory);
            if (history) {
              history.requests.push(gptReq);
              await history.save();
            }
          }
        }
      }

      res.status(200).json({ message: response });
    } catch (error) {
      console.log("error", error);
    }
  }

  async getHistory(req: Request, res: Response) {}
}

const GPT_controller = new GPTController();

export { GPT_controller };
