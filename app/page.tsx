import Image from "next/image";
import styles from "./page.module.css";
import ServiceList from "@/components/service-list/service-list";
import MainHero from "@/components/main-hero/main-hero";

export default function Home() {
  return (
    <>
      <MainHero />
      <ServiceList />
    </>
  );
}
