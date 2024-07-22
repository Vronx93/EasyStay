"use client";

import { ChangeEvent, useEffect, useState } from "react";
import CustomInput from "../custom-input/custom-input";
import ImageInput from "../image-input/image-input";
import styles from "./add-listing-form.module.css";
import { z, ZodString } from "zod";

// thumbnailImage: string | StaticImageData;
// title: string;
// shortDescription: string;
// description: string;
// location: string;
// apartmentId: string;
// images: string[]

const FormDataSchema = z.object({
  primaryImage: z.string().url(),
  title: z
    .string()
    .min(9, { message: "Title should be at least 9 characters long." })
    .max(50, { message: "Title should be max 50 characters long." }),
  shortDescription: z
    .string()
    .min(19, {
      message: "Short description should be at least 19 characters long.",
    })
    .max(200, {
      message: "Short description should be max 200 characters long.",
    }),
  description: z
    .string()
    .min(50, {
      message: "Description should be at least 50 characters long.",
    })
    .max(5000, {
      message: "Description should be max 5000 characters long.",
    }),
  location: z
    .string()
    .min(4, { message: "Location should be at least 4 characters long." })
    .max(20, { message: "Location should be max 20 characters long." }),
  weeklyPrice: z.coerce
    .number({ message: "Price value should be a number." })
    .positive(),
  images: z
    .string()
    .array()
    .nonempty()
    .max(20, { message: "You can add up to 20 pictures." }),
});

type FormDataSchemaType = z.infer<typeof FormDataSchema>;

export default function AddListingForm() {
  const [formData, setFormData] = useState({
    primaryImage: "",
    title: "",
    shortDescription: "",
    description: "",
    location: "",
    weeklyPrice: "",
    images: [],
  });

  const [errors, setErrors] = useState({
    primaryImage: "",
    title: "",
    shortDescription: "",
    description: "",
    location: "",
    weeklyPrice: "",
    images: "",
  });

  function validateInput(schema: any, input: unknown, fieldName: string) {
    const isValid = schema.safeParse(input);
    if (!isValid.success) {
      console.log(isValid.error.errors);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: isValid.error.errors[0].message,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
      //   add here logic for create apartment listing
    }
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: keyof FormDataSchemaType
  ) {
    setFormData((prevData) => ({
      ...prevData,
      [inputName]: event.target.value,
    }));

    validateInput(
      FormDataSchema.shape[inputName],
      formData[inputName],
      inputName
    );
  }
  return (
    <form className={styles.container}>
      <header>
        <h1>Add Listing</h1>
      </header>
      {/* multiple img input */}
      <ImageInput />
      <CustomInput
        nameAndId="title"
        label="Title"
        stateValue={formData.title}
        handleChange={(event) => handleChange(event, "title")}
        errorText={errors.title}
      />
      <CustomInput
        textarea
        nameAndId="shortDescription"
        label="Short description"
        stateValue={formData.shortDescription}
        handleChange={(event) => handleChange(event, "shortDescription")}
        errorText={errors.shortDescription}
      />
      <CustomInput
        textarea
        textareaStyles={styles.description}
        nameAndId={"description"}
        label={"Description"}
        stateValue={formData.description}
        handleChange={(event) => handleChange(event, "description")}
        errorText={errors.description}
      />
      <CustomInput
        nameAndId="location"
        label="Location"
        stateValue={formData.location}
        handleChange={(event) => handleChange(event, "location")}
        errorText={errors.location}
      />
      <CustomInput
        nameAndId="weeklyPrice"
        label="Price per week"
        stateValue={formData.weeklyPrice}
        handleChange={(event) => handleChange(event, "weeklyPrice")}
        errorText={errors.weeklyPrice}
      />
      <button type="submit" className={styles.btn}>
        Add Listing
      </button>
    </form>
  );
}
