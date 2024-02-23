import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        EmailProvider({
            server: {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                }
            },
            from:process.env.EMAIL_FROM,
        })
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };