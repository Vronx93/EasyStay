import ApartmentHero from "@/components/apartment-hero/apartment-hero";
import styles from "./page.module.css";
import ApartmentArticle from "@/components/apartment-article/apartment-article";

export default function Apartment() {
  return (
    <main>
      <ApartmentHero />
      <ApartmentArticle />
    </main>
  );
}
