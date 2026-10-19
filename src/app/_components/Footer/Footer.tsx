import Link from "next/link";
import {
  CreditCard,
  Headphones,
  Mail,
  MapPin,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/profile" },
      { label: "Order History", href: "/allorders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/signIn" },
      { label: "Create Account", href: "/signUp" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/contact" },
      { label: "Help Center", href: "/contact" },
    ],
  },
];

const benefits = [
  { title: "Free Shipping", description: "On orders over 500 EGP", Icon: Truck },
  { title: "Easy Returns", description: "A simple return experience", Icon: RotateCcw },
  { title: "Secure Payment", description: "Protected checkout", Icon: ShieldCheck },
  { title: "24/7 Support", description: "We're here to help", Icon: Headphones },
];

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="border-y border-emerald-100 bg-emerald-50 px-5 py-5 dark:border-emerald-950 dark:bg-emerald-950/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-4">
          {benefits.map(({ title, description, Icon }) => (
            <div key={title} className="flex items-center gap-3 sm:justify-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-primary-600 dark:bg-emerald-900/70 dark:text-emerald-300">
                <Icon size={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
                <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 px-5 text-gray-300 dark:bg-gray-950">
        <div className="mx-auto grid max-w-7xl gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] lg:gap-10 lg:py-14">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-gray-900 transition hover:bg-emerald-50">
              <ShoppingCart size={22} className="text-primary-600" />
              <span className="text-xl font-bold tracking-tight">AuraStore</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              Your destination for quality products, trusted brands, and a smoother shopping experience.
            </p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400">
              <Mail size={16} className="text-emerald-500" />
              Get in touch with our support team
            </Link>
            <p className="mt-3 flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={16} className="shrink-0 text-emerald-500" />
              Online shopping, delivered to your door
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} footer links`}>
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link href={link.href} className="text-sm text-gray-400 transition hover:text-emerald-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Legal information">
            <h2 className="text-sm font-semibold text-white">Legal</h2>
            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright {new Date().getFullYear()} AuraStore. All rights reserved.</p>
            <div className="flex items-center gap-2" aria-label="Accepted payment methods">
              <CreditCard size={15} />
              <span>Secure online payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
