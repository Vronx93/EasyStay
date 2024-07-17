import Authbar from "../authbar/authbar";
import Logo from "../logo/logo";
import Navbar from "../navbar/navbar";
import styles from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <Navbar />
        <Authbar />
      </div>
    </header>
  );
}
