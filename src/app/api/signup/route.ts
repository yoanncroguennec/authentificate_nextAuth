// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  console.log('====================================');
  console.log(email, password, name);
  console.log('====================================');

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ error: "Email déjà utilisé." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    message: "Utilisateur créé avec succès.",
    user: { id: user.id, email: user.email, name: user.name },
  });
}

// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { email, password } = req.body;

//   const existing = await prisma.user.findUnique({ where: { email } });
//   if (existing) return res.status(400).json({ error: "User already exists" });

//   await prisma.user.create({
//     data: { email, password },
//   });

//   return res.status(201).json({ message: "User created" });
// }
