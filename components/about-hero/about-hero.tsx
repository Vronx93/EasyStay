import Image from "next/image";
import styles from "./about-hero.module.css";
import heroImg from "@/public/images/about-hero.jpeg";

export default function AboutHero() {
  return (
    <section className={styles.container}>
      <Image
        src={heroImg}
        priority
        alt={"Happy man with key."}
        fill
        sizes="100vw"
        quality={80}
        className={styles.image}
      />
    </section>
  );
}
