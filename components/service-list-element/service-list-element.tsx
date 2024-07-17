import Image, { StaticImageData } from "next/image";
import styles from "./service-list-element.module.css";
import Link from "next/link";

export default function ServiceListElement({
  element,
}: {
  element: { image: StaticImageData; path: string; text: string; alt: string };
}) {
  return (
    <div className={styles.container}>
      <Link href={element.path}>
        <Image
          src={element.image}
          alt={element.alt}
          className={styles.image}
          fill
          sizes="(max-width: 799px) 90vw, (min-width: 800px) 40vw"
          quality={60}
        />
        <p className={styles.text}>{element.text}</p>
      </Link>
    </div>
  );
}
