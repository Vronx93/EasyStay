"use client";

import { ChangeEvent } from "react";
import styles from "./custom-input.module.css";

interface CustomInputInterface {
  nameAndId: string;
  label: string;
  type?: string;
  textarea?: boolean;
  textareaStyles?: string;
  errorText?: string;
  state: string;
  stateSetter: (value: string) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void
  ) => void;
}

export default function CustomInput({
  nameAndId,
  label,
  type,
  textarea,
  textareaStyles,
  errorText,
  state,
  stateSetter,
  handleChange,
}: CustomInputInterface) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={nameAndId}>
        {label}
      </label>
      {textarea ? (
        <textarea
          className={`${styles.input} ${textareaStyles && textareaStyles}`}
          id={nameAndId}
          name={nameAndId}
          value={state}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(event, stateSetter)
          }
        />
      ) : (
        <input
          className={styles.input}
          id={nameAndId}
          name={nameAndId}
          type={type}
          value={state}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange(event, stateSetter)
          }
        />
      )}
      {errorText && errorText?.length > 2 && (
        <p className={styles.error}>{errorText}</p>
      )}
    </div>
  );
}
