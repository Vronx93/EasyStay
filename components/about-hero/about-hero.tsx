import Image from "next/image";
import styles from "./about-hero.module.css";
import heroImg from "@/public/images/about-hero.jpeg";

export default function AboutHero() {
  return (
    <section className={styles.container}>
      <Image
        priority
        src={heroImg}
        className={styles.image}
        quality={85}
        alt={"Happy man with key to their rented apartment."}
        fill
      />
      <div className={styles.text}>
        <h1>Making Rentals Easy</h1>
        <p>
          Dive into EasyStay’s vision of a seamless and transparent rental
          experience for all users.
        </p>
      </div>
      <div className={styles.gradient}></div>
    </section>
  );
}
