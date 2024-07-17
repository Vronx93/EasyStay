import Link from "next/link";
import styles from "./authbar.module.css";

export default function Authbar() {
  return (
    <Link className={styles.container} href={"/sign-in"}>
      <p>Sign in</p>
    </Link>
  );
}
