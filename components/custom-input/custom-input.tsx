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
  stateValue: string;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function CustomInput({
  nameAndId,
  label,
  type,
  textarea,
  textareaStyles,
  errorText,
  stateValue,
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
          value={stateValue}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(event)
          }
        />
      ) : (
        <input
          className={styles.input}
          id={nameAndId}
          name={nameAndId}
          type={type}
          value={stateValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
      )}
      {errorText && errorText?.length > 2 && (
        <p className={styles.error}>{errorText}</p>
      )}
    </div>
  );
}
