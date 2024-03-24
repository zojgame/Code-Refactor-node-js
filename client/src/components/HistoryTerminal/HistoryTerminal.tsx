import { IconWrapper, CopyIcon } from "@/icons";
import { Editor } from "@monaco-editor/react";
import { useRef, useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import useStore from "@/store/store";

interface TerminalComponentProps {
  defaultCode?: string;
  title?: string;
}

const HistoryTerminal = ({ defaultCode, title }: TerminalComponentProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { selectedProgramLang } = useStore();
  const [code, setCode] = useState<string>("");
  const [, copy] = useCopyToClipboard();

  useEffect(() => {
    setCode(defaultCode ?? ``);
  }, [defaultCode, setCode]);

  function handleOnCopyClick(): void {
    copy(code);
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={() => textareaRef.current?.focus()}
      onClick={() => textareaRef.current?.focus()}
      className={`relative flex bg-black flex-col h-[calc(100vh-100px)] w-full `}
    >
      <div
        className={`flex px-4 py-1 h-[55px] items-center bg-primaryColor ${
          title ? "justify-between" : "justify-end"
        }`}
      >
        {title ? <div className="font-semibold">{title}</div> : <></>}
        <div className="flex gap-4">
          <div className="cursor-pointer" onClick={handleOnCopyClick}>
            <IconWrapper
              hoverTitle="Копировать"
              className="text-secondaryColor hover:text-secondaryHoverColor active:text-secondaryColor"
            >
              <CopyIcon />
            </IconWrapper>
          </div>
        </div>
      </div>
      <Editor
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
        }}
        language={selectedProgramLang.label}
        value={code}
      />
    </div>
  );
};
export { HistoryTerminal };
