"use client";

import { useSearchParams } from "next/navigation";
import styles from "./filter-form.module.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "../custom-input/custom-input";
import { z } from "zod";

export default function FilterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState<string>("");
  const [maxWeeklyPrice, setMaxWeeklyPrice] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filters, setFilters] = useState<string>("");
  const [errors, setErrors] = useState({
    locationError: "",
    priceError: "",
    startDateError: "",
    endDateError: "",
  });

  useEffect(() => {
    let filtersArr: { key: string; value: string }[] = [];
    if (location) {
      const locationSchema = z
        .string({ message: "Location should be a string value." })
        .optional();
      const isValid = locationSchema.safeParse(location);
      if (!isValid.success) {
        throw new Error(isValid.error.message);
      }
      filtersArr.push({ key: "location", value: location });
    }
    if (maxWeeklyPrice) {
      const priceSchema = z.coerce
        .number({ message: "Price value should be a number." })
        .positive()
        .optional();
      const isValid = priceSchema.safeParse(maxWeeklyPrice);
      if (!isValid.success) {
        throw new Error(isValid.error.message);
      }
      filtersArr.push({ key: "price", value: maxWeeklyPrice });
    }
    if (startDate) {
      const dateSchema = z
        .string({ message: "Entered date is incorrect, please use calendar." })
        .date()
        .min(new Date());
      const isValid = dateSchema.safeParse(startDate);
      if (!isValid.success) {
        return isValid.error.message;
      }
      filtersArr.push({ key: "startDate", value: startDate });
    }
    if (endDate) {
      const dateSchema = z
        .string({ message: "Entered date is incorrect, please use calendar." })
        .date();
      const isValid = dateSchema.safeParse(endDate);
      if (!isValid.success) {
        throw new Error(isValid.error.message);
      }
      filtersArr.push({ key: "endDate", value: endDate });
    }
    if (filtersArr.length > 0) {
      console.log(filtersArr);
      let newQuery = filtersArr?.map(
        (filter) => `${filter.key}=${filter.value}&`
      );
      newQuery[newQuery.length - 1].slice(0, -2);
      setFilters(
        `/apartments?${newQuery.toString().replaceAll(",", "").slice(0, -1)}`
      );
    }
  }, [location, maxWeeklyPrice, startDate, endDate]);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) {
    setter(event.target.value);
  }

  const handleSubmit = () => {
    router.push(filters);
  };

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
          defaultValue={"-"}
          value={location && location}
          onChange={(event) => setLocation(event?.target?.value)}
        >
          {mockLocationOptions.map((option) => (
            <option key={crypto.randomUUID()} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <CustomInput
        nameAndId={"priceFilter"}
        label={"Max price per week"}
        type={"text"}
        stateSetter={setMaxWeeklyPrice}
        handleChange={handleInputChange}
      />
      <CustomInput
        nameAndId={"startDate"}
        type="date"
        label={"Available from date:"}
        stateSetter={setStartDate}
        handleChange={handleInputChange}
      />
      <CustomInput
        nameAndId={"startDate"}
        type="date"
        label={"Available from date:"}
        stateSetter={setEndDate}
        handleChange={handleInputChange}
      />
      <button type="submit" className={styles.btn}>
        Apply filters
      </button>
    </form>
  );
}
