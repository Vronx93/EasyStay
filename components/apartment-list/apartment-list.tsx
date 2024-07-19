import ApartmentListElement from "../apartment-list-element/apartment-list-element";
import styles from "./apartment-list.module.css";
import mockImg from "@/public/images/list-apartment-img.jpeg";

export default function ApartmentList() {
  const mockApartmentList = [
    {
      thumbnailImage: mockImg,
      title: "Apartment Title",
      shortDescription: "Mock Short Description",
      mockId: crypto.randomUUID(),
    },
    {
      thumbnailImage: mockImg,
      title: "Apartment Title",
      shortDescription: "Mock Short Description",
      mockId: crypto.randomUUID(),
    },
    {
      thumbnailImage: mockImg,
      title: "Apartment Title",
      shortDescription: "Mock Short Description",
      mockId: crypto.randomUUID(),
    },
    {
      thumbnailImage: mockImg,
      title: "Apartment Title",
      shortDescription: "Mock Short Description",
      mockId: crypto.randomUUID(),
    },
  ];

  return (
    <section className={styles.container}>
      <header>
        <h2>Search Results</h2>
      </header>
      <ul className={styles.list}>
        {mockApartmentList.map((apartment) => (
          <li className={styles.listItem} key={crypto.randomUUID()}>
            <ApartmentListElement
              thumbnailImage={apartment.thumbnailImage}
              title={apartment.title}
              shortDescription={apartment.shortDescription}
              apartmentId={apartment.mockId}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
