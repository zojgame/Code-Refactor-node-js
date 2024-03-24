type ProgramLanguage = {
  id: string;
  value: string;
};

type Language = ProgramLanguage;

type Selector = {
  value: string;
  label: string;
  gptTitle?: string;
};

type AuthorizationRes = {
  id: number;
  username: string;
  accessToken: string;
  tokenType: string;
};

type HistoryRes = {
  requestCode: string | null;
  responseCode: string | null;
  id: number;
  progLang: string;
  dateTimeCreate: string;
};

type Message = {
  role: string;
  content: string;
};

type Choice = {
  finish_reason: string;
  index: number;
  message: Message;
};

type GPTRes = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
};

export type {
  Language,
  ProgramLanguage,
  Selector,
  AuthorizationRes,
  HistoryRes,
  GPTRes,
};
