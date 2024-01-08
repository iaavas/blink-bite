import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type


// Prevent multiple instances of Prisma Client in development
declare const global: any;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;