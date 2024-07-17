import ApartmentListElement, {
  ApartmentListElementProps,
} from "../apartment-list-element/apartment-list-element";
import styles from "./user-public-profile.module.css";

interface UserPublicProfileInterface {
  username: string;
  about?: string;
  listedApartments?: ApartmentListElementProps[];
}

export default function UserPublicProfile({
  username,
  about,
  listedApartments,
}: UserPublicProfileInterface) {
  return (
    <section className={styles.container}>
      <article className={styles.article}>
        <header>
          <h1>{username}</h1>
        </header>
        <p>{about && about}</p>
      </article>
      {listedApartments && <h2>Listed Apartments</h2>}
      {listedApartments && (
        <ul>
          {listedApartments.map((apartment) => (
            <li key={crypto.randomUUID()}>
              <ApartmentListElement
                thumbnailImage={apartment.thumbnailImage}
                title={apartment.title}
                shortDescription={apartment.shortDescription}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
