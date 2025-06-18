import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins"
import { prisma } from "./prisma";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }
    },
    plugins: [
        emailOTP({
            sendVerificationOTP: async ({ email, otp, type }) => {
                const { data, error } = await resend.emails.send({
                    from: "LMS <onboarding@resend.dev>",
                    to: [email],
                    subject: "LMS - Verify your email",
                    html: `<p>Your verification code is ${otp}</p>`,
                });

                if (error) {
                    throw new Error(error.message);
                }
            }
        })
    ]
});