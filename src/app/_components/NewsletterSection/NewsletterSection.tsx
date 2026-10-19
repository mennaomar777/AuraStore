import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Leaf, Mail, Tag, Truck } from "lucide-react";
import Image from "next/image";
import Apple from "@/icons/Apple.svg";

export default function NewsletterSection() {
  return (
    <section className="bg-white dark:bg-[#0b0f14] py-5">
      <div
        className="bg-linear-to-br from-green-50 via-white to-green-50
        dark:from-[#0f1720] dark:via-[#0b0f14] dark:to-[#0f1720]
        flex flex-col lg:flex-row justify-between items-center
        rounded-2xl p-10 mx-5 mt-0
        shadow-[0_7px_30px_rgba(0,188,125,0.12)]
        border border-green-100/60 dark:border-white/10"
      >
        {/* LEFT SIDE */}
        <div>
          <div className="flex items-center gap-5">
            <div className="rounded-2xl p-3.5 text-white bg-[linear-gradient(135deg,#00BC7D_0%,#00BBA7_100%)] shadow-[0px_4px_6px_-4px_#00BC7D4D,0px_10px_15px_-3px_#00BC7D4D]">
              <Mail size={22} />
            </div>

            <div>
              <span className="font-semibold text-sm leading-5 text-primary-600">
                Newsletter
              </span>
              <p className="font-medium text-xs text-gray-500 dark:text-gray-400">
                50,000+ subscribers
              </p>
            </div>
          </div>

          <div>
            <p className="font-bold text-4xl leading-12 my-5 text-gray-900 dark:text-white">
              Get the AuraStore Updates
              <br />
              <span className="text-primary-600">Delivered Free</span>
              <span className="block font-medium text-lg leading-7 text-gray-500 dark:text-gray-400 my-3">
                Weekly recipes, seasonal offers & exclusive member perks.
              </span>
            </p>
          </div>

          <div className="flex flex-col w-fit md:flex-row md:flex-wrap gap-5">
            <div
              className="flex items-center gap-2 rounded-full shadow-sm py-2 px-5
    border border-primary-100/70 dark:border-white/10
    bg-white/70 dark:bg-white/5 backdrop-blur"
            >
              <div
                className="rounded-full p-2 flex items-center justify-center
      bg-primary-100/60 dark:bg-emerald-500/10"
              >
                <Leaf
                  size={16}
                  className="text-primary-600 dark:text-emerald-400"
                />
              </div>

              <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Fresh Picks Weekly
              </p>
            </div>

            <div
              className="flex items-center gap-2 rounded-full shadow-sm py-2 px-5
    border border-primary-100/70 dark:border-white/10
    bg-white/70 dark:bg-white/5 backdrop-blur"
            >
              <div
                className="rounded-full p-2 flex items-center justify-center
      bg-primary-100/60 dark:bg-sky-500/10"
              >
                <Truck
                  size={16}
                  className="text-primary-600 dark:text-sky-400"
                />
              </div>

              <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Free Delivery Codes
              </p>
            </div>

            <div
              className="flex items-center gap-2 rounded-full shadow-sm py-2 px-5
    border border-primary-100/70 dark:border-white/10
    bg-white/70 dark:bg-white/5 backdrop-blur"
            >
              <div
                className="rounded-full p-2 flex items-center justify-center
      bg-primary-100/60 dark:bg-amber-500/10"
              >
                <Tag
                  size={16}
                  className="text-primary-600 dark:text-amber-400"
                />
              </div>

              <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Members-Only Deals
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center mt-7 mb-2 gap-3">
            <Input
              placeholder="you@example.com"
              className="p-6 rounded-2xl border-2 border-gray-200/90 dark:border-white/10 dark:bg-[#0f1720] dark:text-white shadow
              transition-all duration-200 focus-visible:border-primary-500 focus-visible:ring-4 focus-visible:ring-primary-100/50 focus-visible:ring-offset-0
            placeholder:text-gray-300/90 placeholder:dark:text-white/10 placeholder:font-medium"
            />

            <Button className="group w-full md:w-fit rounded-2xl p-7 font-semibold text-[17px] text-white bg-[linear-gradient(90deg,#009966_0%,#00BC7D_100%)] shadow-[0px_4px_6px_-4px_#00BC7D4D,0px_10px_15px_-3px_#00BC7D4D] hover:brightness-110 hover:shadow-[0px_4px_6px_-4px_#00BC7D80,0px_10px_15px_-3px_#00BC7D80] hover:scale-105 transition-all duration-200 cursor-pointer">
              Subscribe
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </div>

          <div>
            <p className="font-medium text-sm text-gray-400 dark:text-gray-300">
              ✨ Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="hidden lg:block w-px h-105 bg-primary-100 dark:bg-white/10"></div>

        {/* RIGHT SIDE */}
        <div
          className="w-full lg:w-fit
          bg-[linear-gradient(135deg,#101828_0%,#1E2939_100%)]
          dark:from-[#0b0f14] dark:to-[#111827]
          rounded-3xl p-7 mt-5 lg:mt-0"
        >
          <div className="inline-flex items-center gap-2 bg-[#1a3d3a] dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[11px] font-medium tracking-widest text-green-400 uppercase">
              📱 Mobile App
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
            Shop Faster on Our App
          </h2>

          <p className="max-w-[90%] text-sm text-gray-300 dark:text-gray-400 mb-6 leading-relaxed font-medium">
            Get app-exclusive deals & 15% off your first order.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <a
              href="#"
              className="flex items-center gap-4 rounded-2xl px-5 py-4
              bg-linear-to-r from-[#2B3444] to-[#1F2937]
              dark:from-[#1f2937] dark:to-[#111827]
              border border-white/10
              shadow-[0_8px_24px_rgba(0,0,0,0.25)]
              transition-all duration-300
              hover:scale-[1.03]
              hover:from-[#3a455a] hover:to-[#2a3548]
              dark:hover:from-[#2a3446] dark:hover:to-[#1a2232]"
            >
              <Image src={Apple} alt="apple-logo" width={17} height={17} />

              <div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest">
                  Download on
                </div>
                <div className="text-[15px] font-semibold text-white">
                  App Store
                </div>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-4 rounded-2xl px-5 py-4
              bg-linear-to-r from-[#2B3444] to-[#1F2937]
              dark:from-[#1f2937] dark:to-[#111827]
              border border-white/10
              shadow-[0_8px_24px_rgba(0,0,0,0.25)]
              transition-all duration-300
              hover:scale-[1.03]
              hover:from-[#3a455a] hover:to-[#2a3548]
              dark:hover:from-[#2a3446] dark:hover:to-[#1a2232]"
            >
              {/* Google Play Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M3.18 23.76C3.49 24.05 3.92 24.12 4.41 23.84L15.08 17.72L11.9 14.54L3.18 23.76ZM0.46 1.27C0.17 1.59 0 2.07 0 2.7V21.3C0 21.93 0.17 22.4 0.46 22.73L0.54 22.8L11.3 12.04V11.96L0.54 1.2L0.46 1.27ZM19.64 10.69L15.08 8.07L11.59 11.56V12.44L15.08 15.93L19.65 13.31C20.93 12.58 20.93 11.42 19.64 10.69ZM4.41 0.16L15.08 6.28L11.9 9.46L3.18 0.24C3.92-0.12 3.49-0.12 4.41 0.16Z" />
              </svg>

              <div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest">
                  Get it on
                </div>
                <div className="text-[15px] font-semibold text-white">
                  Google Play
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 text-amber-400 text-sm">★★★★★</div>
            <span className="text-sm text-[#8aada8] dark:text-gray-400">
              4.9 · 100K+ downloads
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
