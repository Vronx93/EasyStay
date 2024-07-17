import ApartmentList from "@/components/apartment-list/apartment-list";
import styles from "./page.module.css";
import FilterForm from "@/components/filter-form/filter-form";

export default function Apartments() {
  return (
    <main className={styles.main}>
      <FilterForm />
      <ApartmentList />
    </main>
  );
}
