"use client";

import styles from "./filter-form.module.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomInput from "../custom-input/custom-input";
import { z } from "zod";

export default function FilterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState<string>(
    searchParams.get("location") ?? ""
  );
  const [maxWeeklyPrice, setMaxWeeklyPrice] = useState<string>(
    searchParams.get("price") ?? ""
  );
  const [startDate, setStartDate] = useState<string>(
    searchParams.get("startDate") ?? ""
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get("startDate") ?? ""
  );
  const [filtersQuery, setFiltersQuery] = useState<string>("");
  const [filtersArray, setFiltersArray] = useState<
    { key: string; value: string }[]
  >([]);
  const [errors, setErrors] = useState({
    locationError: "",
    priceError: "",
    startDateError: "",
    endDateError: "",
  });

  console.log("errors", errors);

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
        [errorName]: isValid.error.errors[0].message,
      }));
      console.log("after error set", errors);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [errorName]: "" }));
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
      console.log("noError", errors);
    }
  }

  const FormSchema = z.object({
    location: z
      .string({ message: "Location should be a string value." })
      .optional(),
  });

  useEffect(() => {
    if (location) {
      const locationSchema = z
        .string({ message: "Location should be a string value." })
        .min(2)
        .max(20)
        .optional();
      validateInput(locationSchema, location, "locationError", "location");
    }
    if (maxWeeklyPrice) {
      const priceSchema = z.coerce
        .number({ message: "Price value should be a number." })
        .positive()
        .optional();

      validateInput(priceSchema, maxWeeklyPrice, "priceError", "price");
    }
    if (startDate) {
      const dateSchema = z.coerce.date().refine((data) => data > new Date(), {
        message: "The start date cannot be in the past.",
      });
      validateInput(dateSchema, startDate, "startDateError", "startDate");
    }
    if (endDate) {
      const startingDate =
        startDate.length > 2 ? new Date(startDate) : new Date();
      const dateSchema = z.coerce.date().refine((data) => data > startingDate, {
        message: "The end date cannot be before the start date.",
      });
      validateInput(dateSchema, endDate, "endDateError", "endDate");
    }
  }, [location, maxWeeklyPrice, startDate, endDate]);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) {
    setter(event.target.value);
  }

  const handleSubmit = () => {
    if (filtersArray.length > 0) {
      console.log(filtersArray);
      let newQuery = filtersArray?.map(
        (filter) => `${filter.key}=${filter.value}&`
      );
      // newQuery[newQuery.length - 1].slice(0, -2);
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
          value={location && location}
          onChange={(event) => setLocation(event?.target?.value)}
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
        errorText={errors.priceError}
        state={maxWeeklyPrice}
        stateSetter={setMaxWeeklyPrice}
        handleChange={handleInputChange}
      />
      <CustomInput
        nameAndId={"startDate"}
        type="date"
        label={"Available from date:"}
        errorText={errors.startDateError}
        state={startDate}
        stateSetter={setStartDate}
        handleChange={handleInputChange}
      />
      <CustomInput
        nameAndId={"startDate"}
        type="date"
        label={"Available from date:"}
        errorText={errors.endDateError}
        state={endDate}
        stateSetter={setEndDate}
        handleChange={handleInputChange}
      />
      <button
        type="submit"
        className={styles.btn}
        disabled={
          errors.endDateError.length > 2 ||
          errors.locationError.length > 2 ||
          errors.priceError.length > 2 ||
          errors.startDateError.length > 2
        }
      >
        Apply filters
      </button>
    </form>
  );
}
