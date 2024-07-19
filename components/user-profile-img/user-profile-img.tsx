import Image from "next/image";
import styles from "./user-profile-img.module.css";
import mockImg from "@/public/images/list-apartment-img.jpeg";
import trashImg from "@/public/images/trash.svg";

interface UserProfileImgInterface {
  editable?: boolean;
  handleClick?: () => void;
}

export default function UserProfileImg({
  editable,
  handleClick,
}: UserProfileImgInterface) {
  return (
    <div className={styles.container}>
      {editable && (
        <Image
          height={24}
          width={24}
          src={trashImg}
          alt={"Delete profile image."}
          className={styles.deleteImg}
          onClick={handleClick && handleClick}
        />
      )}
      <div className={styles.imageWrapper}>
        <Image
          src={mockImg}
          alt={"Profile image."}
          className={styles.image}
          fill
          sizes="(max-width: 799px) 80vw, (min-width: 800px) 30vw"
        />
      </div>
    </div>
  );
}
