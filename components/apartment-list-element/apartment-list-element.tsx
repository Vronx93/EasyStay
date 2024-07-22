import Image, { StaticImageData } from "next/image";
import styles from "./apartment-list-element.module.css";
import Link from "next/link";
import deleteImg from "@/public/images/trash.svg";

export interface ApartmentListElementProps {
  primaryImage: string | StaticImageData;
  title: string;
  shortDescription: string;
  apartmentId: string;
  editable?: boolean;
}

export default function ApartmentListElement({
  primaryImage,
  title,
  shortDescription,
  apartmentId,
  editable,
}: ApartmentListElementProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={primaryImage}
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
        <div className={styles.cta}>
          <Link className={styles.btn} href={`apartments/${apartmentId}`}>
            {editable ? (
              <p className={styles.rentBtn}>Edit</p>
            ) : (
              <p className={styles.rentBtn}>Rent This Apartment</p>
            )}
          </Link>
          {editable && <button className={styles.red}>Delete</button>}
        </div>
      </article>
    </div>
  );
}
