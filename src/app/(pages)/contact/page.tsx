import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  PackageCheck,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const helpTopics = [
  {
    icon: PackageCheck,
    title: "Order assistance",
    description: "Questions about an order or delivery?",
  },
  {
    icon: Sparkles,
    title: "Product guidance",
    description: "Need help choosing the right product?",
  },
  {
    icon: ShieldCheck,
    title: "Account support",
    description: "Get help with your AuraStore account.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            Contact us
          </span>
        </nav>

        <section className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 via-primary-700 to-emerald-500 px-6 py-9 text-white shadow-xl shadow-emerald-900/10 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-50">
              <CircleHelp size={14} />
              AuraStore customer care
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How can we help?
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/90 sm:text-base sm:leading-7">
              Whether you have a question about an order, a product, or your
              account, send us a message and we’ll point you in the right
              direction.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-emerald-50/90 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} /> Secure support
            </span>
            <span className="inline-flex items-center gap-2">
              <PackageCheck size={16} /> Order help
            </span>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <section className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">
                Support topics
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                We’re here to make things easier
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Choose a topic to get started, or send us the details using the
                form.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {helpTopics.map(({ icon: Icon, title, description }) => (
                <Link
                  key={title}
                  href="#contact-form"
                  className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-700"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-primary-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-gray-500 dark:text-gray-400">
                      {description}
                    </span>
                  </span>
                  <ArrowRight
                    size={17}
                    className="mt-1 shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-primary-600"
                  />
                </Link>
              ))}
            </div>

            <div className="rounded-2xl border border-primary-100 bg-emerald-50/80 p-5 dark:border-primary-900/50 dark:bg-emerald-950/30">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary-700 shadow-sm dark:bg-gray-900 dark:text-primary-300">
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Your details stay protected
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-300">
                    Share only the information needed to help with your
                    question.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="contact-form"
            className="scroll-mt-24 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8 dark:border-gray-800 dark:bg-gray-900"
            aria-labelledby="contact-form-heading"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="contact-form-heading"
                  className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl"
                >
                  Send us a message
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Fill in the form and include the details we’ll need to help.
                </p>
              </div>
              <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-primary-700 sm:flex dark:bg-emerald-950/60 dark:text-emerald-300">
                <Send size={19} />
              </span>
            </div>

            <form className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Your name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="h-11 rounded-xl border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Email address
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-11 rounded-xl border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-topic"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  What can we help with?
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  defaultValue=""
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="order">Order or delivery</option>
                  <option value="product">Product question</option>
                  <option value="account">Account support</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Please don’t include passwords or payment card details.
                </p>
                <Button
                  type="button"
                  className="h-11 w-full gap-2 rounded-xl bg-primary-600 px-6 font-semibold text-white shadow-sm transition hover:bg-primary-700 sm:w-auto"
                >
                  <Send size={16} />
                  Send message
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
