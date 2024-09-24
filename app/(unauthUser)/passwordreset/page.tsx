"use client";
import Card from "@/components/Card";
import { resetPassword } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface FormValues {
	email: string;
}

const PasswordResetPage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		watch,
		reset,
		getValues,
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
		},
	});
	const onHandleSubmit = async (data: FormValues) => {
		try {
			setLoading(true);
			await resetPassword({
				email: data.email,
			});
		} catch (error: any) {
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
			{isSubmitted ? (
				<div className="max-w-lg mx-auto text-center text-emerald-500 font-semibold">
					<Card>
						You will receive a password reset email at {getValues("email")} 📩
					</Card>
				</div>
			) : (
				<div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
							Password Reset
						</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
						<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
							<form
								onSubmit={handleSubmit(onHandleSubmit)}
								className="space-y-6"
								action="#"
								method="POST"
							>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Email address
									</label>
									<div className="mt-2">
										<input
											id="email"
											type="email"
											{...register("email", {
												required: true,
											})}
											autoComplete="email"
											required
											className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div>
									<button
										disabled={loading}
										type="submit"
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait"
									>
										Reset Password
									</button>
								</div>
							</form>
						</div>

						<p className="mt-10 text-center text-sm text-gray-100">
							Remeber password?{" "}
							<Link
								href="/login"
								className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
							>
								Login
							</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default PasswordResetPage;
