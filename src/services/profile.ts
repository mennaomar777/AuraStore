"use server";

import { ChangePasswordType, UpdateUserDataType } from "@/schemas/auth.schema";
import getMyToken from "./getToken";

export async function updateUserData(data: UpdateUserDataType) {
  const token = await getMyToken();
  if (!token) throw new Error("unexpected error!");
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update userData");
  }
  const finalRes = await res.json();
  console.log(finalRes);

  return finalRes;
}

export async function updateUserPassword(data: ChangePasswordType) {
  const token = await getMyToken();
  if (!token) throw new Error("unexpected error!");
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update userData");
  }
  const finalRes = await res.json();
  //   console.log(finalRes);

  return finalRes;
}
