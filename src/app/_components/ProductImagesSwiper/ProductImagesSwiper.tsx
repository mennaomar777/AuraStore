"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperInstance } from "swiper";

export default function ProductImagesSwiper({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full overflow-hidden rounded-2xl"
      >
        {images.map((img, index) => (
          <SwiperSlide key={`${img}-${index}`}>
            <div className="group relative h-[300px] w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800 sm:h-[360px] lg:h-[380px]">
              <Image
                src={img}
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 38vw"
                priority={index === 0}
                className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03] sm:p-8"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          modules={[FreeMode]}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={{ enabled: true, momentum: true }}
          watchSlidesProgress
          className="cursor-pointer"
        >
          {images.map((img, index) => (
            <SwiperSlide key={`thumb-${img}-${index}`}>
              <div className={`relative h-16 w-full overflow-hidden rounded-xl border-2 bg-gray-50 transition sm:h-20 dark:bg-gray-800 ${activeIndex === index ? "border-primary-500" : "border-transparent opacity-65 hover:opacity-100"}`}>
                <Image
                  src={img}
                  alt={`View product image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 20vw, 10vw"
                  className="object-contain p-1"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
