import {
  ForgetPasswordType,
  ResetPasswordPayload,
  SignUpFormType,
  VerifyResetCodeType,
} from "@/schemas/auth.schema";

export async function signUpUser(
  data: Omit<SignUpFormType, "acceptTerms">,
) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const finalRes = await res.json();

  if (!res.ok) {
    throw new Error(finalRes.message || "Something went wrong");
  }

  return finalRes;
}

export async function forgetPass(data: ForgetPasswordType) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const finalRes = await res.json();
  console.log(finalRes);

  if (!res.ok) {
    throw new Error(finalRes.message || "Something went wrong");
  }

  return finalRes;
}

export async function verifyResetCode(data: VerifyResetCodeType) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const finalRes = await res.json();
  console.log(finalRes);

  if (!res.ok) {
    throw new Error(finalRes.message || "Something went wrong");
  }

  return finalRes;
}

export async function resetPassword(data: ResetPasswordPayload) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to reset password");
  }
  const finalRes = await res.json();
  console.log(finalRes);

  return true;
}
