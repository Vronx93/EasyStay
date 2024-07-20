"use client";

import Link from "next/link";
import CustomInput from "../custom-input/custom-input";
import styles from "./sign-up-form.module.css";

export default function SignUpForm() {
  return (
    <form className={styles.container}>
      <header>
        <h1>Sign Up</h1>
      </header>
      <CustomInput nameAndId="username" label="Username" />
      <CustomInput nameAndId="email" label="Email" />
      <CustomInput nameAndId="password" label="Password" />
      <CustomInput nameAndId="confirmPassword" label="Confirm password" />
      <button type="submit">Sign up</button>
      <small>
        Already have an account? <Link href={"/log-in"}>Log in.</Link>
      </small>
    </form>
  );
}
