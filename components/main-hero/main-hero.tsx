import Image from "next/image";
import styles from "./main-hero.module.css";
import heroImg from "@/public/images/main-hero.jpeg";

export default function MainHero() {
  return (
    <section className={styles.container}>
      <Image
        src={heroImg}
        className={styles.image}
        alt={"Happy people with key to their rented apartment."}
        fill
      />
      <div className={styles.text}>
        <h1>Welcome To EasyStay</h1>
        <p>Rental Apartment App in Poland</p>
      </div>
    </section>
  );
}
