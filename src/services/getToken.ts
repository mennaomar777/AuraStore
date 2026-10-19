import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  const cookie = await cookies();

  const encToken =
    cookie.get("next-auth.session-token")?.value ||
    cookie.get("__Secure-next-auth.session-token")?.value;

  const decToken = await decode({
    token: encToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const token = decToken?.accessToken;
  return token;
}
