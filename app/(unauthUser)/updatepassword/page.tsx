import Card from "@/components/Card";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import prisma from "@/prisma/db";
import Link from "next/link";

interface Props {
	searchParams: {
		token?: string;
	};
}
const PasswordUpdatePage = async ({ searchParams: { token } }: Props) => {
	let isTokenValid = false;
	if (token) {
		const passwordResetToken = await prisma.passwordResetToken.findFirst({
			where: {
				token,
			},
			select: {
				token: true,
				tokenExpiry: true,
			},
		});
		const now = Date.now();
		if (
			passwordResetToken?.token &&
			now < passwordResetToken.tokenExpiry.getTime()
		) {
			isTokenValid = true;
		}
	}
	return (
		<div className="min-h-screen flex flex-col justify-center">
			{isTokenValid ? (
				<UpdatePasswordForm token={token ?? ""} />
			) : (
				<div className="self-center">
					<Card>
						<p className="text-2xl font-bold">
							Your password link is invalid or expired
						</p>
						<Link
							className="text-emerald-700 underline text-center"
							href={"/passwordreset"}
						>
							Send another password reset link
						</Link>
					</Card>
				</div>
			)}
		</div>
	);
};

export default PasswordUpdatePage;
