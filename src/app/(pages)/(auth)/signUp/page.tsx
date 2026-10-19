import { SignUpForm } from "../../../_components/SignUpForm/SignUpForm";
import Image from "next/image";
import girlPhoto from "@/images/girl.png";
import FillStar from "@/icons/FillStar.svg";
import Star2 from "@/icons/Star2.svg";
import Truck from "@/icons/Truck.svg";
import Vector from "@/icons/Vector.svg";

export default function SignUp() {
  return (
    <div className="md:flex justify-between gap-12 my-5  py-15">
      <div className="md:max-w-[46%] mb-10">
        <div className="mb-2">
          <h1 className="font-bold text-4xl text-gray-600 dark:text-white mb-2">
            Welcome to <span className="text-primary-600">AuraStore</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl font-medium">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>
        </div>

        <div className="py-6 space-y-6">
          <div className="flex gap-4 items-center">
            <div className="flex justify-center items-center p-3 rounded-full bg-primary-100 dark:bg-primary-600/20">
              <Image src={Star2} alt="" width={20} height={20} />
            </div>
            <div>
              <h2 className="font-semibold text-lg leading-7 text-black dark:text-white">
                Premium Quality
              </h2>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Premium quality products sourced from trusted suppliers.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex justify-center items-center p-3 rounded-full bg-primary-100 dark:bg-primary-600/20">
              <Image src={Truck} alt="" width={20} height={20} />
            </div>
            <div>
              <h2 className="font-semibold text-lg leading-7 text-black dark:text-white">
                Fast Delivery
              </h2>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Same-day delivery available in most areas
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex justify-center items-center p-3 rounded-full bg-primary-100 dark:bg-primary-600/20">
              <Image src={Vector} alt="" width={20} height={20} />
            </div>
            <div>
              <h2 className="font-semibold text-lg leading-7 text-black dark:text-white">
                Secure Shopping
              </h2>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Your data and payments are completely secure
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-sm px-3 py-5 bg-white dark:bg-dark-900 rounded-xl border border-transparent dark:border-dark-700">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <Image
                src={girlPhoto}
                alt="Sarah Johnson"
                width={48}
                height={48}
              />
            </div>
            <div>
              <span className="font-medium text-gray-600 dark:text-gray-200">
                Sarah Johnson
              </span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    src={FillStar}
                    alt=""
                    width={20}
                    height={20}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="italic text-gray-500 dark:text-gray-400">
            &quot;AuraStore has transformed my shopping experience. The quality
            of the products is outstanding, and the delivery is always on time.
            Highly recommend!&quot;
          </p>
        </div>
      </div>
      <SignUpForm />
    </div>
  );
}
