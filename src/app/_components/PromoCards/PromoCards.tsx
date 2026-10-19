import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PromoCards() {
  return (
    <section className="py-10 px-5 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-emerald-500 to-emerald-700 p-6 md:p-8 flex flex-col justify-between">
          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-18 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-15 -left-15 w-32 h-32 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center w-fit text-sm gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full font-medium">
              🔥 Deal of the Day
            </div>

            <h2 className="text-3xl font-bold text-white mt-4 leading-tight">
              Fresh Organic Fruits
            </h2>

            <p className="text-emerald-100 font-medium leading-6 mt-3">
              Get up to 40% off on selected organic fruits
            </p>

            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="text-3xl font-bold text-white">40% OFF</span>

              <p className="text-emerald-100 text-sm">
                Use code:{" "}
                <span className="font-bold text-white">ORGANIC40</span>
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="relative z-10 mt-4 inline-flex w-fit items-center gap-2 bg-white text-emerald-600 hover:bg-gray-100 transition-all duration-300 px-6 py-3 rounded-full font-semibold"
          >
            Shop Now
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Right Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#FF8904_0%,#FF2056_100%)] p-6 md:p-8 flex flex-col justify-between">
          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-18 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-15 -left-15 w-32 h-32 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center w-fit text-sm gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full font-medium">
              ✨ New Arrivals
            </div>

            <h2 className="text-3xl font-bold text-white mt-4 leading-tight">
              Exotic Vegetables
            </h2>

            <p className="text-emerald-100 font-medium leading-6 mt-3">
              Discover our latest collection of premium vegetables
            </p>

            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="text-3xl font-bold text-white">25% OFF</span>

              <p className="text-emerald-100 text-sm">
                Use code: <span className="font-bold text-white">FRESH25</span>
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="relative z-10 mt-4 inline-flex w-fit items-center gap-2 bg-white text-orange-500 hover:bg-gray-100 transition-all duration-300 px-6 py-3 rounded-full font-semibold"
          >
            Explore Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
