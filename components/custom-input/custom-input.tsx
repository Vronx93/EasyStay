"use client";

import { ChangeEvent } from "react";
import styles from "./custom-input.module.css";

interface CustomInputInterface {
  nameAndId: string;
  label: string;
  type?: string;
  textarea?: boolean;
  textareaStyles?: string;
  errorArray?: string[];
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
  errorArray,
  stateValue,
  handleChange,
}: CustomInputInterface) {
  const removeRepeatMessage = () => {
    let newArray: string[] = [];
    if (errorArray) {
      for (const message of errorArray) {
        if (!newArray.includes(message)) {
          console.log(message);
          newArray.push(message);
        }
      }
    }
    return newArray;
  };
  const filteredErrorArray = removeRepeatMessage();

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
      <ul className={styles.errorList}>
        {errorArray &&
          filteredErrorArray.length > 0 &&
          filteredErrorArray.map((error) => (
            <li key={crypto.randomUUID()}>
              <p className={styles.error}>{error}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
