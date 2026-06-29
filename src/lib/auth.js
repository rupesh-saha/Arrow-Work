

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const getDb = () => {
  const client = new MongoClient(process.env.ARROW_URI);
  return { client, db: client.db('arrowDB') };
};

const { client, db } = getDb();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "client" },
      image: { type: "string", required: false },
      skills: { type: "string[]", required: false },
      bio: { type: "string", required: false },
      hourlyRate: { type: "number", required: false },
      isBlocked: { type: "boolean", required: false, defaultValue: false }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {

          let assignedRole = user.role === 'freelancer' ? 'freelancer' : 'client';

          if (user.email === 'admin1@taskhive.com') assignedRole = 'admin';

          return {
            data: {
              ...user,
              role: assignedRole,
              isBlocked: false
            }
          };
        }
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7*24*60*60
    }
  },
  plugins: [
    jwt(),
  ]
});