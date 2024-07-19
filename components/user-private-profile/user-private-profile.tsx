"use client";

import { useState } from "react";
import styles from "./user-private-profile.module.css";
import UserProfileImg from "../user-profile-img/user-profile-img";
import ImageInput from "../image-input/image-input";
import EditTextElement from "../edit-text-element/edit-text-element";

export default function UserPrivateProfile() {
  const [isPhotoDeleted, setIsPhotoDeleted] = useState(false);
  // add logic to set deleted photo and delete it on submit or just handle it by "put".
  // const [deletedPhoto, setDeletedPhoto] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState({
    image: false,
    about: false,
    email: false,
    phone: false,
    password: false,
  });

  function handleEditClick(item: string) {
    setIsEditing((prevIsEditing) => ({ ...prevIsEditing, [item]: true }));
  }
  return (
    <form action="" className={styles.container}>
      <div className={styles.imageContentWrapper}>
        {isPhotoDeleted ? (
          <ImageInput />
        ) : (
          <UserProfileImg
            editable={isEditing.image}
            handleClick={() => setIsPhotoDeleted(true)}
          />
        )}
        {!isEditing.image ? (
          <button
            className={styles.btn}
            type="button"
            onClick={() => handleEditClick("image")}
          >
            Edit
          </button>
        ) : (
          <div className={styles.buttonPlaceholder}></div>
        )}
      </div>

      <div className={styles.textContentWrapper}>
        <span className={styles.boldSpan}>
          About
          {!isEditing.about && (
            <button type="button" onClick={() => handleEditClick("about")}>
              Edit
            </button>
          )}
        </span>
        {!isEditing.about ? (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            error quis dolor neque necessitatibus animi iure soluta asperiores
            libero suscipit quaerat, atque provident? Nostrum sit perspiciatis
            eveniet delectus ipsum dicta!
          </p>
        ) : (
          <textarea
            className={styles.input}
            rows={10}
            id="about"
            name="about"
          />
        )}
      </div>
      <EditTextElement
        isEditing={isEditing}
        option={"email"}
        spanText={"Email Address"}
        handleEditClick={handleEditClick}
      />
      <EditTextElement
        isEditing={isEditing}
        option={"phone"}
        spanText={"Phone Number"}
        handleEditClick={handleEditClick}
      />
      <div className={styles.textContentWrapper}>
        <span className={styles.boldSpan}>
          Password
          {!isEditing.password && (
            <button type="button" onClick={() => handleEditClick("password")}>
              Edit
            </button>
          )}
        </span>
        {isEditing.password && (
          <>
            <input
              className={styles.input}
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
            />
            <input
              className={styles.input}
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              placeholder="Confirm new password"
            />
          </>
        )}
      </div>
      <button
        className={styles.submit}
        type="submit"
        disabled={
          isEditing.about ||
          isEditing.email ||
          isEditing.image ||
          isEditing.password ||
          isEditing.phone
            ? false
            : true
        }
      >
        Save changes
      </button>
    </form>
  );
}
