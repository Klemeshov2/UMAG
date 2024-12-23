/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  if (!Number(id)) return NextResponse.json({ error: 'id not number' }, { status: 404 });

  try {
    const deletedArticle = await prisma.article.delete({
      where: {
        id: Number(id)
      }
    });

    return NextResponse.json(deletedArticle);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  if (!Number(id)) return NextResponse.json({ error: 'id not number' }, { status: 404 });

  const body = await req.json();

  try {
    const article = await prisma.article.update({
      where: {
        id: Number(id)
      },
      data: body
    });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};
