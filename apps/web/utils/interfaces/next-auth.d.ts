/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      username: string;
    };
    token: string;
  }
}
