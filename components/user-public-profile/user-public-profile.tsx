import ApartmentListElement, {
  ApartmentListElementProps,
} from "../apartment-list-element/apartment-list-element";
import styles from "./user-public-profile.module.css";

interface UserPublicProfileInterface {
  username: string;
  email?: string;
  phone?: string;
  about?: string;
  listedApartments?: ApartmentListElementProps[];
}

export default function UserPublicProfile({
  username,
  email,
  phone,
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
        {email && (
          <span>
            Email: <p>{email}</p>
          </span>
        )}
        {phone && (
          <span>
            Phone: <p>{phone}</p>
          </span>
        )}
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
