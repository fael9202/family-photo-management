import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
            {
              method: "POST",
              body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const authData = await response.json();
          if (!response.ok) {
            throw new Error(authData.message || "Erro ao fazer login");
          }
          if (!authData.data.token || !authData.data.user) {
            return null;
          }
          if (authData) {
            return authData;
          }
          return null;
        } catch (err) {
          throw new Error(err?.message || "Erro ao fazer login");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session.data;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function useServerSession() {
  return await getServerSession(authOptions);
}
