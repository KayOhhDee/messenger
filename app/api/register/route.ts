import bcrypt from 'bcrypt';

import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST (request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse('Please enter your name, email, and password.', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse('Email already in use.', { status: 400 });
  }
}