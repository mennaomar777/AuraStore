import { Headphones, RotateCwIcon, ShieldCheck, Truck } from "lucide-react";

export default function HomeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="shadow bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 flex items-center gap-3 p-5 rounded-xl hover:shadow-md hover:scale-[1.01] transition-all duration-300">
        <div className="flex justify-center items-center p-3 rounded-full bg-blue-100/50 dark:bg-blue-500/10">
          <Truck size={22} className="text-[#2B7FFF] dark:text-blue-400" />
        </div>

        <div>
          <span className="font-semibold text-sm leading-5 text-gray-900 dark:text-gray-300">
            Free Shipping
          </span>

          <p className="font-medium text-xs leading-4 text-gray-400 dark:text-gray-300">
            On orders over 500 EGP
          </p>
        </div>
      </div>

      <div className="shadow bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 flex items-center gap-3 p-5 rounded-xl hover:shadow-md hover:scale-[1.01] transition-all duration-300">
        <div className="flex justify-center items-center p-3 rounded-full bg-green-100/50 dark:bg-green-500/10">
          <ShieldCheck
            size={22}
            className="text-[#00BC7D] dark:text-green-400"
          />
        </div>

        <div>
          <span className="font-semibold text-sm leading-5 text-gray-900 dark:text-gray-300">
            Secure Payment
          </span>

          <p className="font-medium text-xs leading-4 text-gray-400 dark:text-gray-300">
            100% secure transactions
          </p>
        </div>
      </div>

      <div className="shadow bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 flex items-center gap-3 p-5 rounded-xl hover:shadow-md hover:scale-[1.01] transition-all duration-300">
        <div className="flex justify-center items-center p-3 rounded-full bg-orange-100/40 dark:bg-orange-500/10">
          <RotateCwIcon
            size={22}
            className="text-[#FF6900] dark:text-orange-400"
          />
        </div>

        <div>
          <span className="font-semibold text-sm leading-5 text-gray-900 dark:text-gray-300">
            Easy Returns
          </span>

          <p className="font-medium text-xs leading-4 text-gray-400 dark:text-gray-300">
            14-day return policy
          </p>
        </div>
      </div>

      <div className="shadow bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 flex items-center gap-3 p-5 rounded-xl hover:shadow-md hover:scale-[1.01] transition-all duration-300">
        <div className="flex justify-center items-center p-3 rounded-full bg-purple-100/50 dark:bg-purple-500/10">
          <Headphones
            size={22}
            className="text-[#AD46FF] dark:text-purple-400"
          />
        </div>

        <div>
          <span className="font-semibold text-sm leading-5 text-gray-900 dark:text-gray-300">
            24/7 Support
          </span>

          <p className="font-medium text-xs leading-4 text-gray-400 dark:text-gray-300">
            Dedicated support team
          </p>
        </div>
      </div>
    </div>
  );
}
