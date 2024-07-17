import Image, { StaticImageData } from "next/image";
import styles from "./apartment-list-element.module.css";
import Link from "next/link";

export interface ApartmentListElementProps {
  thumbnailImage: string | StaticImageData;
  title: string;
  shortDescription: string;
}

export default function ApartmentListElement({
  thumbnailImage,
  title,
  shortDescription,
}: ApartmentListElementProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={thumbnailImage}
          fill
          quality={60}
          alt="Apartment thumbnail."
          sizes="(max-width: 799px) 90vw, (min-width: 800px) 40vw"
        />
      </div>
      <article className={styles.article}>
        <header>
          <h3 className={styles.title}>{title}</h3>
        </header>
        <p>{shortDescription}</p>
        <Link className={styles.btn} href={`apartments/${title}`}>
          <p>Rent This Apartment</p>
        </Link>
      </article>
    </div>
  );
}
