import { ROLE } from "../types/role";

// const AUTH_TOKEN = "Bearer bb1a7ff1-b839-4324-939c-7a478b69aab7";
const AUTH_TOKEN = "Bearer b1d30572-27e1-4f47-b0bc-c63315bf38c2";

const GPT_API = "https://api.caipacity.com/v1/chat/completions";

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

const ROLES: Record<string, ROLE> = {
  ASSINSTANT: "assistant",
  SYSTEM: "system",
  USER: "user",
};

export { AUTH_TOKEN, GPT_API, TONES, TYPES, LANGUAGES, ROLES };
