import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Vérifie que l'email et le mot de passe sont fournis
        if (
          !credentials?.email ||
          typeof credentials.email !== "string" ||
          !credentials?.password
        ) {
          return null; // Retourne null si l'email ou le mot de passe est manquant
        }

        // Cherche l'utilisateur dans la base de données avec un email valide
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Si l'utilisateur n'existe pas ou n'a pas de mot de passe, on retourne null
        if (!user || !user.password) return null;

        // Utilise bcrypt.compare avec des chaînes de caractères
        const isValid = await bcrypt.compare(
          String(credentials.password), // assure-toi que c'est une chaîne
          String(user.password) // assure-toi que c'est une chaîne
        );

        // Si le mot de passe n'est pas valide, retourne null
        if (!isValid) return null;

        // Retourne l'utilisateur s'il est valide
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
