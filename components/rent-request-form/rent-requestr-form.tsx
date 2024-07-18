import styles from "./rent-request-form.module.css";

export default function RentRequestForm() {
  return (
    <form className={styles.container}>
      <button type="submit">Send rent request</button>
    </form>
  );
}
