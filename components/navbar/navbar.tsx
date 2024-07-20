import NavLink from "../nav-link/nav-link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <NavLink to="/apartments">
        <p>Apartments</p>
      </NavLink>
      <NavLink to="/account/user-listings/add-listing">
        <p>Add Listing</p>
      </NavLink>
      <NavLink to="/about">
        <p>About</p>
      </NavLink>
      <NavLink to="/contact">
        <p>Contact</p>
      </NavLink>
    </nav>
  );
}
