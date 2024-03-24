import { Selector } from "@/types";

const programmingLanguages: Selector[] = [
  { value: "1", label: "javascript" },
  { value: "2", label: "c" },
  { value: "3", label: "swift" },
  { value: "4", label: "typescript" },
  { value: "5", label: "java" },
];

const additionalPrompts: Selector[] = [
  {
    value: "1",
    label: "Пояснить код комментариями",
    gptTitle: "Написать комментарии поясняющие код",
  },
  {
    value: "2",
    label: "Написать код как можно короче",
    gptTitle: "Сделать рефакторинг, сделав код более коротким",
  },
  {
    value: "3",
    label: "Удалить комментарии",
    gptTitle: "Удалить все комментарии",
  },
  {
    value: "5",
    label: "Переименовать переменные",
    gptTitle: "Переименовать переменные и функции, сделав код понятнее",
  },
  {
    value: "9",
    label: "Рефакторинг методом camelCase",
    gptTitle:
      "сделать рефакторин, переименовав все переменные и функции методом camelcase",
  },
  {
    value: "10",
    label: "Рефакторинг методом snakeCase",
    gptTitle:
      "сделать рефакторин, переименовав все переменные и функции методом snakecase",
  },
];

const processingToneType: Selector[] = [
  { value: "1", label: "Профессиональный", gptTitle: "Профессиональнее" },
  { value: "2", label: "Понятный", gptTitle: "Понятнее" },
];

const languages = ["javascript", "c", "swift", "typescript", "java"];

//langReqId, langResId, typeId, toneId, adding?, code

export {
  programmingLanguages,
  additionalPrompts,
  processingToneType,
  languages,
};
