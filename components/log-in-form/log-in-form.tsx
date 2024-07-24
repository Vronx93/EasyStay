"use client";

import Link from "next/link";
import CustomInput from "../custom-input/custom-input";
import styles from "./log-in-form.module.css";
import { ChangeEvent, useState } from "react";
import { z } from "zod";

// validate in the formAction
const FormSchema = z.object({
  email: z.string().email({ message: "Please enter valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 characters." }),
});

export default function LogInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: event.target.value,
    }));
  };

  return (
    <form className={styles.container}>
      <header>
        <h1>Log In</h1>
      </header>
      <CustomInput
        nameAndId="email"
        label="Email"
        stateValue={formData.email}
        handleChange={(event) => handleChange(event, "email")}
      />
      <CustomInput
        nameAndId="password"
        label="Password"
        stateValue={formData.password}
        handleChange={(event) => handleChange(event, "password")}
      />
      <button type="submit">Log In</button>
      <small>
        Dont have an account yet? <Link href={"/sign-up"}>Sign up.</Link>
      </small>
    </form>
  );
}
