"use server";
import { CheckoutFormType } from "@/schemas/checkout.schema";
import getMyToken from "./getToken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function onlinePayment(
  cartId: string,
  formValues: CheckoutFormType,
) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Unauthorized - no token found");
  }
  const url = process.env.NEXTAUTH_URL;
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?${url}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    },
  );
  if (!res.ok) throw new Error("Failed to pay online");
  const data = await res.json();
  //   console.log(data);

  return data;
}

export async function cashPayment(
  cartId: string,
  formValues: CheckoutFormType,
) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Unauthorized - no token found");
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    },
  );
  if (!res.ok) throw new Error("Failed to pay cach ");
  const data = await res.json();
  console.log(data);

  return data;
}

export async function getUserOrders() {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${session?.user?.id}`,
  );
  if (!res.ok) throw new Error("Failed to get user orders ");
  const data = await res.json();
  console.log(data);

  return data;
}
