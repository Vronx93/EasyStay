import { ChangeEvent } from "react";
import styles from "./custom-input.module.css";

interface CustomInputInterface {
  nameAndId: string;
  label: string;
  type: string;
  stateSetter: (value: string) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => void;
}

export default function CustomInput({
  nameAndId,
  label,
  type,
  stateSetter,
  handleChange,
}: CustomInputInterface) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={nameAndId}>
        {label}
      </label>
      <input
        className={styles.input}
        id={nameAndId}
        name={nameAndId}
        type={type}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleChange(event, stateSetter)
        }
      />
    </div>
  );
}
