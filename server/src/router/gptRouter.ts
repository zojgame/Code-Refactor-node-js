import { Router } from "express";
import { GPT_controller } from "../controllers";

const GPT_Router = Router();

GPT_Router.post("/sentMessage", GPT_controller.createRequest);
GPT_Router.get("/history", GPT_controller.createRequest);

export { GPT_Router };
