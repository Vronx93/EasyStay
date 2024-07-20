import styles from "./apartment-article.module.css";

export default function ApartmentArticle() {
  const mockApartmentObject = {
    title: "Mock Apartment",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis mollitia, iusto aliquid porro placeat architecto quisquam voluptatibus atque itaque? Deserunt dolorem quibusdam voluptatem quaerat laudantium suscipit veniam voluptatum, quidem perferendis!",
    location: "Cracow, Poland",
    rentPerWeek: 1000,
    unavailableDates: true,
    hostObject: "Mock Host Object.Name",
  };

  return (
    <article className={styles.container}>
      <header>
        <h1>{mockApartmentObject.title}</h1>
      </header>
      <div className={styles.contentWrapper}>
        <h2>Description</h2>
        <p>{mockApartmentObject.description}</p>
        <p>
          <span className={styles.bold}>Location: </span>
          {mockApartmentObject.location}
        </p>
        <p>
          <span className={styles.bold}>Rent per week: </span>
          {mockApartmentObject.rentPerWeek} PLN
        </p>
        <p>
          <span className={styles.bold}>Avaliability: </span>
          {mockApartmentObject.unavailableDates}
        </p>
        <p>
          <span className={styles.bold}>Host: </span>
          {mockApartmentObject.hostObject}
        </p>
      </div>
    </article>
  );
}
