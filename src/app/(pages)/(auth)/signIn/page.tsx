import { SignInForm } from "@/app/_components/SignInForm/SignInForm";
import Image from "next/image";
import vegetables from "@/images/fresh vegetables.png";
import Vector from "@/icons/Vector.svg";
import clock from "@/icons/Small-watch.svg";
import Truck from "@/icons/Small-truck.svg";

export default function SignIn() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 md:grid-cols-2 md:gap-10 lg:px-8 lg:py-16">
      <div className="hidden md:block">
        <div>
          <Image
            src={vegetables}
            alt="vegetables and fruit"
            width={616}
            height={384}
          />
        </div>
        <div>
          <h2 className="font-bold text-3xl text-center text-gray-800 dark:text-gray-100">
            AuraStore - Your One-Stop Shop for Fresh Products
          </h2>

          <p className="text-lg text-gray-500 dark:text-gray-400 text-center my-4 font-medium">
            Join thousands of happy customers who trust AuraStore for their
            daily grocery needs
          </p>

          <div className="flex justify-center items-center gap-10">
            <div className="flex justify-center items-center gap-2">
              <Image src={Truck} alt="" width={14} height={14} />
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Free Delivery
              </span>
            </div>

            <div className="flex justify-center items-center gap-2">
              <Image src={Vector} alt="" width={14} height={14} />
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Secure Payment
              </span>
            </div>

            <div className="flex justify-center items-center gap-2">
              <Image src={clock} alt="" width={14} height={14} />
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-xl">
        <SignInForm />
      </div>
    </div>
  );
}
