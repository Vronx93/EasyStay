import Image from "next/image";
import styles from "./user-profile-img.module.css";
import mockImg from "@/public/images/list-apartment-img.jpeg";

export default function UserProfileImg() {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={mockImg}
        alt={"Profile image."}
        className={styles.image}
        fill
        sizes="(max-width: 799px) 80vw, (min-width: 800px) 30vw"
      />
    </div>
  );
}
