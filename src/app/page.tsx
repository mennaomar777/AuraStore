import AllProducts from "./_components/AllProducts/AllProducts";
import { CarouselSection } from "./_components/CarouselSection/CarouselSection";
import HomeCards from "./_components/HomeCards/HomeCards";
import HomeCategories from "./_components/HomeCategories/HomeCategories";
import NewsletterSection from "./_components/NewsletterSection/NewsletterSection";
import PromoCards from "./_components/PromoCards/PromoCards";

export default function Home() {
  return (
    <main className="bg-white transition-colors duration-300 dark:bg-gray-950">
      <CarouselSection />

      <section className="bg-gray-50 py-7 transition-colors duration-300 dark:bg-gray-900 md:py-9">
        <div className="mx-auto max-w-7xl px-5">
          <HomeCards />
        </div>
      </section>

      <HomeCategories />
      <PromoCards />
      <AllProducts />
      <NewsletterSection />
    </main>
  );
}
