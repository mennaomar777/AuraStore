"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import slider1 from "@/images/slider-image-1.jpeg";
import slider2 from "@/images/slider-image-2.jpeg";
import slider3 from "@/images/slider-image-3.jpeg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const slides = [
  {
    img: slider1,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    firstLink: "/products",
    secondLink: "/products",
    firstContent: "Shop Now",
    secondContent: "View Deals",
  },
  {
    img: slider2,
    title: "New Arrivals Every Day",
    subtitle: "Shop the freshest picks",
    firstLink: "/products",
    secondLink: "/about",
    firstContent: "Shop Now",
    secondContent: "Learn More",
  },
  {
    img: slider3,
    title: "Free Shipping on Orders 500 EGP",
    subtitle: "Order now and save more",
    firstLink: "/products",
    secondLink: "/delivery",
    firstContent: "Order Now",
    secondContent: "Delivery Info",
  },
];

export function CarouselSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };

    update();
    api.on("select", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);

  return (
    <section
      className="relative w-full bg-white transition-colors duration-300 dark:bg-zinc-950"
      aria-label="Featured offers"
    >
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.title}>
              <Card className="rounded-none border-0 bg-transparent py-0 shadow-none">
                <CardContent className="relative p-0">
                  <Image
                    src={slide.img}
                    alt=""
                    width={1600}
                    height={700}
                    preload={index === 0}
                    sizes="100vw"
                    className="h-95 w-full object-cover brightness-75 transition-all duration-300 sm:h-105 lg:h-125"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-950/85 via-emerald-950/55 to-emerald-950/10" />

                  <div className="absolute inset-0 flex items-center">
                    <div className="mx-auto w-full max-w-7xl px-5 pb-9 sm:px-12 sm:pb-7 md:px-16">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-100 sm:text-sm">
                        Welcome to AuraStore
                      </p>
                      <h1 className="max-w-xl text-3xl font-bold leading-[1.12] text-white sm:text-4xl sm:leading-tight md:text-5xl">
                        {slide.title}
                      </h1>
                      <p className="mt-3 max-w-lg text-base text-white/85 sm:text-lg">
                        {slide.subtitle}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
                        <Link href={slide.firstLink}>
                          <Button className="cursor-pointer rounded-full bg-white px-5 py-5 text-sm font-semibold text-emerald-800 transition hover:scale-[1.02] hover:bg-emerald-50 sm:px-6 sm:text-base">
                            {slide.firstContent}
                          </Button>
                        </Link>
                        <Link href={slide.secondLink}>
                          <Button className="cursor-pointer rounded-full border border-white/70 bg-white/10 px-5 py-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:px-6 sm:text-base">
                            {slide.secondContent}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer border-0 bg-white/90 text-emerald-700 shadow-md transition hover:scale-105 hover:bg-white md:flex md:left-5" />
        <CarouselNext className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer border-0 bg-white/90 text-emerald-700 shadow-md transition hover:scale-105 hover:bg-white md:flex md:right-5" />

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              onClick={() => api?.scrollTo(i)}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                i === current
                  ? "h-2.5 w-7 bg-white"
                  : "h-2.5 w-2.5 bg-white/55 hover:bg-white/85"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
