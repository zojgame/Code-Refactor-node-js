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
};

type HistoryRes = {
  user: string;
  requestCode: string | null;
  responseCode: string | null;
  id: number;
  progLang: string;
  dateTimeCreate: string;
};

type GPTRes = {
  message: string;
};

export type {
  Language,
  ProgramLanguage,
  Selector,
  AuthorizationRes,
  HistoryRes,
  GPTRes,
};
