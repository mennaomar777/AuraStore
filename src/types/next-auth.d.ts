import "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    role: string;
    phone?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      role: string;
      id: string;
      phone?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    role: string;
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  }
}
