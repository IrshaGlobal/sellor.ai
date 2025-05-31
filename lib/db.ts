import { PrismaClient } from '@prisma/client';

const prismaGlobal = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// Create a single instance of PrismaClient and store it in the global object
export const db = prismaGlobal.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// In development mode, store the PrismaClient instance in the global object
// to prevent creating multiple instances during hot reloading
if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = db;
}

export default db;