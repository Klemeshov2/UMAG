/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const articles = await prisma.article.findMany();

  return NextResponse.json(articles);
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const article = await prisma.article.create({
      data: body
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};
