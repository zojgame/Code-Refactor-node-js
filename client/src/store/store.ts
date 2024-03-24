import { create } from "zustand";
import { Selector } from "@/types";
import { programmingLanguages } from "@/consts/data";
import { MessageInstance } from "antd/es/message/interface";
import { HistoryRes } from "@/types";

interface StoreType {
  notificationMessage: MessageInstance | null;
  modal: React.ReactNode | null;
  selectedProgramLang: Selector;
  selectedHistory: null | HistoryRes;
  codePrompt: string;
  codeProcessed: string;
  setCodePrompt: (code: string) => void;
  setSelectedHistory: (hist: null | HistoryRes) => void;
  setCodeProcessed: (code: string) => void;
  setNotificationMessage: (message: MessageInstance | null) => void;
  setModal: (modal: React.ReactNode | null) => void;
  setProgramLang: (lang: Selector) => void;
}

const useStore = create<StoreType>((set) => ({
  notificationMessage: null,
  selectedHistory: null,
  modal: null,
  codePrompt: "",
  codeProcessed: "",
  selectedProgramLang: programmingLanguages[0],
  setCodePrompt: (code: string) => set(() => ({ codePrompt: code })),
  setSelectedHistory: (hist: null | HistoryRes) =>
    set(() => ({ selectedHistory: hist })),
  setCodeProcessed: (code: string) => set(() => ({ codeProcessed: code })),
  setNotificationMessage: (message) =>
    set(() => ({ notificationMessage: message })),
  setModal: (modal) => set(() => ({ modal: modal })),
  setProgramLang: (lang) => set(() => ({ selectedProgramLang: lang })),
}));

export default useStore;
