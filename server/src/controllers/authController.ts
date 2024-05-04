import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import User from "../models/user";
import { secret } from "../config";
import History from "../models/history";

const generateAccessToken = (id: Types.ObjectId, username: string) => {
  const payload = {
    id,
    username,
  };

  return jwt.sign(payload, secret, { expiresIn: "365d" });
};

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors: errors });
      }

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userHistory = new History({
        requests: [],
        user: username,
      });

      const user = new User({
        username: username,
        password: hashPassword,
        historyRequests: userHistory,
      });

      await userHistory.save();
      await user.save();
      return res.status(200).json({
        message:
          "Пользователь успешно создан, перейдите на страницу авторизации",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Ошибка регистрации" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (!candidate) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, candidate.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Неправильные данные входа` });
      }

      const token = generateAccessToken(candidate._id, username);
      return res.json({
        accessToken: token,
        username: username,
        message: "Вы успешно вошли",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }
}

const Auth_controller = new AuthController();

export { Auth_controller };
