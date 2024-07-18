import ApartmentHero from "@/components/apartment-hero/apartment-hero";
import styles from "./page.module.css";
import ApartmentArticle from "@/components/apartment-article/apartment-article";
import RentRequestForm from "@/components/rent-request-form/rent-requestr-form";

export default function Apartment() {
  return (
    <main>
      <ApartmentHero />
      <ApartmentArticle />
      <RentRequestForm />
    </main>
  );
}
