import NextAuth, { type AuthOptions } from "next-auth";

import DiscordProvider from "next-auth/providers/discord";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../../app/libs/db";
import { env } from "../../../../env.mjs";

export const authOptions: AuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  //   pages: {
  //     signIn: "/",
  //   },
  //   debug: process.env.NODE_ENV === "development",
  //   session: {
  //     strategy: "jwt",
  //   },
  //   secret: process.env.NEXTAUTH_SECRET,
};

// const handler:TypeOf NextAuth = NextAuth(authOptions);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
