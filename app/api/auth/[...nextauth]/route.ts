import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Create a type-safe adapter for Prisma
const prismaAdapter = (): Adapter => {
  return {
    ...PrismaAdapter(db),
    // Add any custom adapter logic here if needed
  };
};

export const authOptions: NextAuthOptions = {
  adapter: prismaAdapter() as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing email or password');
        }

        // Check if user exists in database
        const user = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // If user doesn't exist or password doesn't match
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
        
        // Add additional user roles for platform admins and vendors
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          include: {
            vendor: true,
            admin: true
          }
        });
        
        if (dbUser) {
          session.user.role = dbUser.role;
          session.user.isAdmin = !!dbUser.admin;
          session.user.isVendor = !!dbUser.vendor;
          
          if (dbUser.vendor) {
            session.user.storeId = dbUser.vendor.id;
            session.user.storeName = dbUser.vendor.storeName;
            session.user.storeUrl = dbUser.vendor.urlSlug;
          }
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SESSION_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

// Default export for NextAuth.js API route
export { handler as GET, handler as POST } from 'next-auth/next';