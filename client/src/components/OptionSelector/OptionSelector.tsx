import { Selector } from "@/types";
import { useState } from "react";
import styles from "./selector.module.css";

interface OptionSelectorProps {
  value: string;
  options: Selector[];
}

const OptionSelector = ({
  options,
  value,
}: OptionSelectorProps): JSX.Element => {
  const className = false;
  const [isActive, setIsActive] = useState(false);

  function handleOnActiveChange(): void {
    setIsActive((prev) => !prev);
  }

  return (
    <div className={`${styles.dropdown} flex ${className ? className : ""}`}>
      <div
        onClick={handleOnActiveChange}
        className={`${styles.dropdownBtn} truncate w-full`}
      >
        {value}
        <span className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"} />
      </div>
      <div
        className={`${styles.dropdownContent}`}
        style={{ display: isActive ? "block" : "none" }}
      >
        {options.map((opt) => (
          <div key={opt.value} className={`${styles.item} truncate bg-inherit`}>
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export { OptionSelector };
