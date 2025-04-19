import { handlers } from "@/auth/authSetup"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;

// // src/app/api/auth/[...nextauth]/route.ts

// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import { compare } from "bcryptjs";

// const handler = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials?.email },
//         });

//         if (!user || !user.password) return null;

//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid) return null;

//         return user;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     signOut: "/logout",
//     error: "/error",
//   },
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user && token.sub) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) token.sub = user.id;
//       return token;
//     },
//   },
// });

// export { handler as GET, handler as POST };
