"use client";
import { ChangeEvent } from "react";
import CustomInput from "../custom-input/custom-input";
import ImageInput from "../image-input/image-input";
import styles from "./add-listing-form.module.css";

// thumbnailImage: string | StaticImageData;
// title: string;
// shortDescription: string;
// description: string;
// location: string;
// apartmentId: string;
// images: string[]

export default function AddListingForm() {
  return (
    <form className={styles.container}>
      <header>
        <h1>Add Listing</h1>
      </header>
      {/* multiple img input */}
      <ImageInput />
      <CustomInput nameAndId="title" label="Title" />
      <CustomInput
        textarea
        nameAndId="shortDescription"
        label="Short description"
      />
      <CustomInput
        textarea
        textareaStyles={styles.description}
        nameAndId={"description"}
        label={"Description"}
      />
      <CustomInput nameAndId="location" label="Location" />
      <CustomInput nameAndId="weeklyPrice" label="Price per week" />
      <button type="submit" className={styles.btn}>
        Add Listing
      </button>
    </form>
  );
}
