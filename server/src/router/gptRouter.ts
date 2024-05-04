import { Router } from "express";
import { GPT_controller } from "../controllers";

const GPT_Router = Router();

GPT_Router.post("/sentMessage", GPT_controller.createRequest);
GPT_Router.get("/history", GPT_controller.getHistory);

export { GPT_Router };
