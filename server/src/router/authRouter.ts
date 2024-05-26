import { Router } from "express";
import { check } from "express-validator";
import { Auth_controller } from "../controllers/authController";

const Auth_Router = Router();

Auth_Router.post(
  "/registration",
  [
    check("username", "Имя пользователя не должно быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4").isLength({ min: 5 }),
    check("password", "Пароль не должен быть пустым").notEmpty(),
  ],
  Auth_controller.registration
);

Auth_Router.post("/login", Auth_controller.login);

export { Auth_Router };
