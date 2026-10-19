import { ArrowRight, Sparkles, Tags } from "lucide-react";
import Link from "next/link";
import BrandCard from "../BrandCard/BrandCard";

export default function AllBrands() {
  return (
    <main className="min-h-screen bg-white pb-16 dark:bg-gray-950">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#065F46_0%,#059669_52%,#34D399_100%)] text-white">
        <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <nav
            className="mb-8 flex items-center gap-2 text-sm text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-white">Brands</span>
          </nav>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                <Sparkles size={14} /> SHOP THE NAMES YOU TRUST
              </div>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
                Discover our <span className="text-emerald-200">brands</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                Explore trusted names and find the products that fit your style,
                your home, and your everyday needs.
              </p>
              <a
                href="#brand-list"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Browse all brands <ArrowRight size={16} />
              </a>
            </div>

            <div className="hidden h-36 w-36 items-center justify-center rounded-4xl border border-white/20 bg-white/10 shadow-2xl shadow-emerald-950/20 backdrop-blur sm:flex md:h-44 md:w-44">
              <Tags
                className="h-16 w-16 text-white/90 md:h-20 md:w-20"
                strokeWidth={1.25}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="brand-list"
        className="mx-auto max-w-7xl px-5 pt-10 md:pt-14"
      >
        <BrandCard />
      </section>
    </main>
  );
}
