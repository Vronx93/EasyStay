"use client";

import Link from "next/link";
import CustomInput from "../custom-input/custom-input";
import styles from "./sign-up-form.module.css";
import { ChangeEvent, useState } from "react";
import { z } from "zod";

const FormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username should be at least 3 characters long." })
      .max(50, { message: "Username should be max 50 characters long." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, {
        message: "Password is too short. Please use at least 8 characters.",
      })
      .max(100, {
        message: "Please provide password with less than 100 characters.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password is too short. Please use at least 8 characters.",
      })
      .max(100, {
        message: "Please provide password with less than 100 characters.",
      }),
  })
  .refine((inputData) => inputData.password === inputData.confirmPassword, {
    message: "Passwords doesn't match.",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

interface ErrorsInterface {
  username: string[];
  email: string[];
  password: string[];
  confirmPassword: string[];
}

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorsInterface>({
    username: [],
    email: [],
    password: [],
    confirmPassword: [],
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof FormSchemaType
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: event.target.value,
    }));
    if (fieldName === "password" || fieldName === "confirmPassword") {
      validateInput(FormSchema, formData, fieldName);
    } else {
      validateInput(
        FormSchema._def.schema.shape[fieldName],
        formData[fieldName],
        fieldName
      );
    }
  };

  function validateInput(schema: any, input: unknown, fieldName: string) {
    const isValid = schema.safeParse(input);
    if (!isValid.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: isValid.error.errors.map(
          (error: { message: string }) => error.message
        ),
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
      //   add here logic for create apartment listing
    }
    if (typeof input === "string" && input.length < 2) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
    }
  }

  return (
    <form className={styles.container}>
      <header>
        <h1>Sign Up</h1>
      </header>
      <CustomInput
        nameAndId="username"
        label="Username"
        stateValue={formData.username}
        handleChange={(event) => handleChange(event, "username")}
        errorArray={errors.username}
      />
      <CustomInput
        nameAndId="email"
        label="Email"
        stateValue={formData.email}
        handleChange={(event) => handleChange(event, "email")}
        errorArray={errors.email}
      />
      <CustomInput
        type="password"
        nameAndId="password"
        label="Password"
        stateValue={formData.password}
        handleChange={(event) => handleChange(event, "password")}
        errorArray={errors.password.filter((errorMessage) =>
          errorMessage.startsWith("Password")
        )}
      />
      <CustomInput
        type="password"
        nameAndId="confirmPassword"
        label="Confirm password"
        stateValue={formData.confirmPassword}
        handleChange={(event) => handleChange(event, "confirmPassword")}
        errorArray={errors.confirmPassword.filter((errorMessage) =>
          errorMessage.startsWith("Password")
        )}
      />
      <button type="submit">Sign up</button>
      <small>
        Already have an account? <Link href={"/log-in"}>Log in.</Link>
      </small>
    </form>
  );
}
