import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { MapPin, MapPinned, Phone } from "lucide-react";

import { authOptions } from "@/lib/authOptions";
import { getUserAddresses } from "@/services/addresses";
import ProfileSideBar from "@/app/_components/ProfileSideBar/ProfileSideBar";
import AddAddressModal from "@/app/_components/AddAddressModal/AddAddressModal";
import DeleteAddressButton from "@/app/_components/DeleteAddressButton/DeleteAddressButton";

export default async function AddressesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signIn");
  }

  const result = await getUserAddresses();
  const addresses = Array.isArray(result?.data) ? result.data : [];

  return (
    <main className="min-h-[70vh] bg-gray-50/80 px-4 py-8 dark:bg-gray-950 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="relative mb-7 overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-primary-700 to-emerald-500 px-6 py-7 text-white shadow-xl shadow-emerald-900/10 sm:px-9 sm:py-8">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <MapPin size={25} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                Your AuraStore account
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                My Account
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Manage your delivery addresses and account settings.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8">
          <ProfileSideBar />

          <section className="min-w-0">
            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  My Addresses
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage the places where your orders can be delivered.
                </p>
              </div>
              <AddAddressModal />
            </div>

            {addresses.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-900">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-primary-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <MapPinned size={25} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                  No addresses saved yet
                </h3>
                <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Add a delivery address so it is ready when you place your next
                  order.
                </p>
              </div>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {addresses.map(
                  (address: {
                    _id: string;
                    name?: string;
                    details?: string;
                    city?: string;
                    phone?: string;
                  }) => (
                    <li
                      key={address._id}
                      className="group rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-900"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-primary-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                          <MapPin size={19} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {address.name ?? "Address"}
                            </p>
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                              Delivery
                            </span>
                          </div>
                          <p className="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-300">
                            {address.details}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                            {address.city && (
                              <span className="inline-flex items-center gap-1.5">
                                <MapPinned size={13} /> {address.city}
                              </span>
                            )}
                            {address.phone && (
                              <span className="inline-flex items-center gap-1.5">
                                <Phone size={13} /> {address.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <DeleteAddressButton
                          addressId={address._id}
                          addressName={address.name ?? "this address"}
                        />
                      </div>
                    </li>
                  ),
                )}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
