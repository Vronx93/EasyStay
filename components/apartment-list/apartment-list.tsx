import ApartmentListElement from "../apartment-list-element/apartment-list-element";
import styles from "./apartment-list.module.css";
import mockImg from "@/public/images/list-apartment-img.jpeg";

export default function ApartmentList({ editable }: { editable?: boolean }) {
  const mockApartmentList = [
    {
      primaryImage: mockImg,
      title: "Apartment Title",
      shortDescription: "Mock Short Description",
      mockId: crypto.randomUUID(),
    },
    {
      primaryImage: mockImg,
      title: "Apartment Title",
      shortDescription: "Mock Short Description",
      mockId: crypto.randomUUID(),
    },
    {
      primaryImage: mockImg,
      title: "Apartment Title",
      shortDescription: "Mock Short Description",
      mockId: crypto.randomUUID(),
    },
    {
      primaryImage: mockImg,
      title: "Apartment Title",
      shortDescription: "Mock Short Description",
      mockId: crypto.randomUUID(),
    },
  ];

  return (
    <section className={styles.container}>
      <header>
        <h2>{editable ? "Your Listings" : "Search Results"}</h2>
      </header>
      <ul className={styles.list}>
        {mockApartmentList.map((apartment) => (
          <li className={styles.listItem} key={crypto.randomUUID()}>
            <ApartmentListElement
              primaryImage={apartment.primaryImage}
              title={apartment.title}
              shortDescription={apartment.shortDescription}
              apartmentId={apartment.mockId}
              editable={editable}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
