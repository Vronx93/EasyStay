import Image from "next/image";
import styles from "./main-hero.module.css";
import heroImg from "@/public/images/main-hero.jpeg";

export default function MainHero() {
  return (
    <section className={styles.container}>
      <Image
        priority
        src={heroImg}
        className={styles.image}
        quality={85}
        alt={"Happy people with key to their rented apartment."}
        fill
      />
      <div className={styles.text}>
        <h1>Find Your Perfect Home with EasyStay</h1>
        <p>Seamless Rentals. Trusted Listings. Easy Living.</p>
      </div>
      <div className={styles.gradient}></div>
    </section>
  );
}
