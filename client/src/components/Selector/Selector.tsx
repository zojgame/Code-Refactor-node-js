import { useState } from "react";
import { Theme } from "@monaco-editor/react/dist";
import { Selector } from "@/types";
import styles from "./selector.module.css";
import { ArrowIcon, IconWrapper } from "@/icons";

interface SelectorComponentProps {
  options: Selector[];
  value: string;
  handleOnSelect: (event: string) => void;
  className?: string;
  hoverTitle?: string;
}

const SelectorComponent = ({
  options,
  value,
  handleOnSelect,
  className = "w-[100px]",
  hoverTitle,
}: SelectorComponentProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleOnClick = (opt: Selector) => {
    return () => {
      const theme = opt.label as Theme;
      handleOnSelect(theme);
      setIsActive(!isActive);
    };
  };

  function handleOnActiveChange(): void {
    setIsActive((prev) => !prev);
  }

  return (
    <div
      title={hoverTitle}
      className={`${styles.dropdown} flex w-[120px] ${
        className ? className : ""
      }`}
    >
      <div
        onClick={handleOnActiveChange}
        className={`${styles.dropdownBtn} truncate w-full`}
      >
        {value}
        <span
          className={`${
            isActive ? "fas fa-caret-up" : "fas fa-caret-down"
          } align-middle`}
        />
        <IconWrapper className="ml-auto">
          <ArrowIcon />
        </IconWrapper>
      </div>
      <div
        className={`${styles.dropdownContent}`}
        style={{ display: isActive ? "block" : "none" }}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={handleOnClick(opt)}
            className={`${styles.item} truncate bg-inherit hover:bg-secondaryColor text-secondaryColor hover:text-primaryColor`}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export { SelectorComponent };
