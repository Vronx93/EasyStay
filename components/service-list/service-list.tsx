import styles from "./service-list.module.css";
import listApartment from "@/public/images/list-apartment-img.jpeg";
import rentApartment from "@/public/images/rent-apartment-img.jpeg";
import ServiceListElement from "../service-list-element/service-list-element";
// element: { image: HTMLImageElement; path: string; text: string; alt: string };

export default function ServiceList() {
  const servicesList = [
    {
      image: listApartment,
      path: "/account/user-listings/add-listing",
      text: "List Apartment",
      alt: "Passing keys for an apartment.",
    },
    {
      image: rentApartment,
      path: "/apartments",
      text: "Rent Apartment",
      alt: "Host welcoming you into the apartment.",
    },
  ];

  return (
    <section className={styles.container}>
      <header>
        <h2>Services</h2>
      </header>
      <ul className={styles.list}>
        {servicesList.map((service) => (
          <li key={crypto.randomUUID()}>
            <ServiceListElement element={service} />
          </li>
        ))}
      </ul>
    </section>
  );
}
