import UserPublicProfile from "@/components/user-public-profile/user-public-profile";
import styles from "./page.module.css";
import UserProfileImg from "@/components/user-profile-img/user-profile-img";

export default function Profile() {
  return (
    <>
      <UserProfileImg />
      <UserPublicProfile
        username={"Test Mock-User"}
        about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis quia et provident nulla totam quisquam voluptate expedita minus, consequuntur autem minima, nesciunt asperiores nisi rem cumque illum. Veritatis, ratione."
      />
    </>
  );
}
