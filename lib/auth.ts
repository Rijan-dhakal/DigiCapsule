import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const adminRole = "admin";
const userRole = "default";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: userRole,
        };
      },
    },
  },
  plugins: [
    admin({
      adminRoles: [adminRole],
      defaultRole: userRole,
    }),
    nextCookies(),
  ],
});
