"use client";

import styles from "./filter-form.module.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomInput from "../custom-input/custom-input";
import { z } from "zod";

export default function FilterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: searchParams.get("location") ?? "",
    maxWeeklyPrice: searchParams.get("price") ?? "",
    startDate: searchParams.get("startDate") ?? "",
    endDate: searchParams.get("startDate") ?? "",
  });
  const [filtersQuery, setFiltersQuery] = useState<string>("");
  const [filtersArray, setFiltersArray] = useState<
    { key: string; value: string }[]
  >([]);
  const [errors, setErrors] = useState({
    locationError: [],
    priceError: [],
    startDateError: [],
    endDateError: [],
  });

  function validateInput(
    schema: any,
    input: unknown,
    errorName: string,
    queryName: string
  ) {
    const isValid = schema.safeParse(input);
    if (!isValid.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorName]: isValid.error.errors.map(
          (error: { message: string }) => error.message
        ),
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [errorName]: [] }));
      setFiltersArray((prevArray) => {
        const existingIndex = prevArray.findIndex(
          (filter) => filter.key === queryName
        );
        if (existingIndex !== -1) {
          const updatedArray = [...prevArray];
          updatedArray[existingIndex].value = input as string;
          return updatedArray;
        } else {
          return [...prevArray, { key: queryName, value: input as string }];
        }
      });
    }
  }

  useEffect(() => {
    if (formData.location[0]) {
      const locationSchema = z
        .string({ message: "Location should be a string value." })
        .min(2)
        .max(20)
        .optional();
      validateInput(
        locationSchema,
        formData.location[0],
        "locationError",
        "location"
      );
    }
    if (formData.maxWeeklyPrice[0]) {
      const priceSchema = z.coerce
        .number({ message: "Price value should be a number." })
        .positive()
        .optional();

      validateInput(
        priceSchema,
        formData.maxWeeklyPrice[0],
        "priceError",
        "price"
      );
    }
    if (formData.startDate[0]) {
      const dateSchema = z.coerce.date().refine((data) => data > new Date(), {
        message: "The start date cannot be in the past.",
      });
      validateInput(
        dateSchema,
        formData.startDate[0],
        "startDateError",
        "startDate"
      );
    }
    if (formData.endDate[0]) {
      const startingDate =
        formData.startDate.length > 0
          ? new Date(formData.startDate[0])
          : new Date();
      const dateSchema = z.coerce.date().refine((data) => data > startingDate, {
        message: "The end date cannot be before the start date.",
      });
      validateInput(dateSchema, formData.endDate[0], "endDateError", "endDate");
    }
  }, [formData]);

  function handleInputChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    inputName: string
  ) {
    setFormData((prevData) => ({
      ...prevData,
      [inputName]: [event.target.value],
    }));
  }

  const handleSubmit = () => {
    if (filtersArray.length > 0) {
      let newQuery = filtersArray?.map(
        (filter) => `${filter.key}=${filter.value}&`
      );
      setFiltersQuery(
        `/apartments?${newQuery.toString().replaceAll(",", "").slice(0, -1)}`
      );
    }
  };

  useEffect(() => {
    router.push(filtersQuery);
  }, [filtersQuery]);

  const mockLocationOptions = [
    "All",
    "Cracow",
    "Warsaw",
    "Wroclaw",
    "Gdansk",
    "Katowice",
  ];

  return (
    <form action={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <select
          className={styles.input}
          name="location"
          id="location"
          title="location"
          value={formData.location && formData.location}
          onChange={(event) => handleInputChange(event, "location")}
        >
          {mockLocationOptions.map((option) => (
            <option key={crypto.randomUUID()} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.locationError.length > 2 && (
          <p className={styles.error}>{errors.locationError}</p>
        )}
      </div>
      <CustomInput
        nameAndId={"priceFilter"}
        label={"Max price per week"}
        type={"text"}
        errorArray={errors.priceError}
        stateValue={formData.maxWeeklyPrice}
        handleChange={(event) => handleInputChange(event, "maxWeeklyPrice")}
      />
      <CustomInput
        nameAndId={"startDate"}
        type="date"
        label={"Available from date:"}
        errorArray={errors.startDateError}
        stateValue={formData.startDate}
        handleChange={(event) => handleInputChange(event, "startDate")}
      />
      <CustomInput
        nameAndId={"endDate"}
        type="date"
        label={"Available to date:"}
        errorArray={errors.endDateError}
        stateValue={formData.endDate}
        handleChange={(event) => handleInputChange(event, "endDate")}
      />
      <button
        type="submit"
        className={styles.btn}
        disabled={
          errors.endDateError.length > 0 ||
          errors.locationError.length > 0 ||
          errors.priceError.length > 0 ||
          errors.startDateError.length > 0
        }
      >
        Apply filters
      </button>
    </form>
  );
}
