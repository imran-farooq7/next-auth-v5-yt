"use server";
import { auth, signIn } from "@/auth";
import prisma from "@/prisma/db";
import { compare, hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { mailer } from "./email";
export const registerUser = async (data: {
	email: string;
	password: string;
	confirmPassword: string;
}) => {
	const hashedPassword = await hash(data.password, 10);
	try {
		const user = await prisma.user.create({
			data: {
				email: data.email,
				password: hashedPassword,
			},
		});
		if (user) {
			return {
				status: "success",
				message: "User created successfully",
			};
		}
	} catch (error: any) {
		if (error.code === "P2002") {
			return {
				status: "error",
				message: "user already exists",
			};
		}
		return {
			status: "error",
			message: "User creation failed",
		};
	}
};
export const loginUser = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	console.log(email, "from action");
	try {
		const res = await signIn("credentials", {
			email: email,
			password,
			redirect: false,
		});
		if (res) {
			return {
				status: "success",
				message: "Login successful",
			};
		}
	} catch (error) {
		return {
			status: "error",
			message: "incorrect email or password",
		};
	}
};
export const changePassword = async ({
	currentPassword,
	password,
}: {
	currentPassword: string;
	password: string;
}) => {
	const session = await auth();
	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email!,
		},
		select: {
			password: true,
		},
	});
	const isPasswordCorrect = await compare(currentPassword, user?.password!);
	if (isPasswordCorrect) {
		const hashedPassword = await hash(password, 10);
		const updatedUser = await prisma.user.update({
			where: {
				email: session?.user?.email!,
			},
			data: {
				password: hashedPassword,
			},
		});
		if (updatedUser) {
			return {
				status: "success",
				message: "password changed successfully",
			};
		}
	} else {
		return {
			status: "error",
			message: "incorrect current password",
		};
	}
};
export const resetPassword = async ({ email }: { email: string }) => {
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		return {
			status: "error",
			message: "Your email is not registered",
		};
	}
	const token = randomBytes(32).toString("hex");
	const tokenExpiry = new Date(Date.now() + 3600000);
	const newPasswordToken = await prisma.passwordResetToken.upsert({
		where: {
			userEmail: email,
		},
		update: {
			token,
			tokenExpiry,
		},
		create: {
			token,
			tokenExpiry,
			userEmail: email,
		},
	});
	const resetLink = `${process.env.SITE_BASE_URL}/updatepassword?token=${newPasswordToken.token}`;
	await mailer.sendMail({
		from: "test@resend.dev",
		subject: "Password Reset Link",
		to: email,
		text: `Hi ${email} Your password reset link is
		<a href={${resetLink}}>Click here</a>
		This link will be expired in 1 hour`,
	});
};
export const updatePassword = async ({
	token,
	password,
}: {
	token: string;
	password: string;
}) => {
	const passwordResetToken = await prisma.passwordResetToken.findFirst({
		where: {
			token,
		},
	});
	const now = Date.now();
	if (passwordResetToken && now < passwordResetToken.tokenExpiry.getTime()) {
		const hashedPassword = await hash(password, 10);
		const updatedUser = await prisma.user.update({
			where: {
				email: passwordResetToken.userEmail,
			},
			data: {
				password: hashedPassword,
			},
		});
		if (updatedUser) {
			await prisma.passwordResetToken.delete({
				where: { token, userEmail: passwordResetToken.userEmail },
			});
			return {
				status: "success",
				message: "Password updated successfully",
			};
		} else {
			return {
				status: "error",
				message: "Something went wrong",
			};
		}
	} else {
		return {
			status: "error",
			message: "Your password reset token has been expired ",
		};
	}
};
