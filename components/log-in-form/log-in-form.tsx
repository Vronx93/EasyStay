import Link from "next/link";
import CustomInput from "../custom-input/custom-input";
import styles from "./log-in-form.module.css";

export default function LogInForm() {
  return (
    <form className={styles.container}>
      <header>
        <h1>Log In</h1>
      </header>
      <CustomInput nameAndId="email" label="Email" />
      <CustomInput nameAndId="password" label="Password" />
      <button type="submit">Log In</button>
      <small>
        Dont have an account yet? <Link href={"/sign-up"}>Sign up.</Link>
      </small>
    </form>
  );
}
