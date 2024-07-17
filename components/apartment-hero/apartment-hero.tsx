"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import styles from "./apartment-hero.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import mockImg1 from "@/public/images/list-apartment-img.jpeg";
import mockImg2 from "@/public/images/rent-apartment-img.jpeg";
import Image from "next/image";

export default function ApartmentHero() {
  const mockImgList = [mockImg1, mockImg2];

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      centeredSlides={true}
      centeredSlidesBounds={true}
      initialSlide={0}
      centerInsufficientSlides={true}
      className={styles.swiper}
      grabCursor
      navigation
      pagination
      keyboard
      modules={[Pagination, Navigation, Keyboard]}
    >
      {mockImgList.map((image, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <Image
            className={styles.image}
            src={image}
            fill
            alt={"Apartment photo."}
            sizes="(max-width: 799px) 100vw, (min-width: 800px) 100vw"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
