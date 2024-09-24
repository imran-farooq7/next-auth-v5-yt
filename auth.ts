import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/db";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	providers: [
		GitHub,
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize({ email, password }, request) {
				const user = await prisma.user.findUnique({
					where: {
						email: email as string,
					},
				});
				if (!user) {
					throw new Error("User not found");
				} else {
					const isPasswordCorrect = await compare(
						password as string,
						user.password!
					);
					if (!isPasswordCorrect) {
						throw new Error("Password is incorrect");
					}
				}
				return {
					id: user.id,
					email: user.email,
				};
			},
		}),
	],
});
