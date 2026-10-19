"use server";
import { AddressFormValues } from "@/schemas/address.schema";
import getMyToken from "./getToken";

export async function getUserAddresses() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    headers: {
      token,
    },
  });

  if (!res.ok) throw new Error("something happen!");
  const data = await res.json();
  return data;
}

export async function getSpecificAddress(addressId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      headers: {
        token,
      },
    },
  );

  if (!res.ok) throw new Error("something happen!");
  const data = await res.json();
  console.log(data);
  return data;
}

export async function addUserAddress(values: AddressFormValues) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "POST",
    headers: {
      token,
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) throw new Error("something happen!");
  const data = await res.json();
  return data;
}

export async function removeUserAddress(addressId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Unauthorized - no token found");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    },
  );

  if (!res.ok)
    throw new Error(`Could not delete the address (HTTP ${res.status}).`);
  const data = await res.json();
  return data;
}
