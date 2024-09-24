"use client";
import { registerUser } from "@/lib/actions";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface FormValues {
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterPage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const onHandleSubmit = async (data: FormValues) => {
		try {
			setLoading(true);
			const res = await registerUser(data);
			if (res?.status === "success") {
				toast.success(res.message);
				reset();
				router.push("/login");
			} else {
				toast.error(res?.message!);
			}
		} catch (error: any) {
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
						Register
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
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										type="password"
										autoComplete="current-password"
										{...register("password", { required: true })}
										required
										className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Confirm Password
								</label>
								<div className="mt-2">
									<input
										id="confirmPassword"
										type="password"
										autoComplete="current-password"
										{...register("confirmPassword", {
											required: true,
											validate: (val: string) => {
												if (watch("password") !== val) {
													return "Confirm Password should be matches the password";
												}
											},
										})}
										required
										className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.confirmPassword?.message && (
										<p className="text-red-600">
											{errors.confirmPassword.message}
										</p>
									)}
								</div>
							</div>

							<div>
								<button
									disabled={loading}
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait"
								>
									Register
								</button>
							</div>
						</form>
						<button
							onClick={() => signIn("github")}
							className="flex w-full mt-4 items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
						>
							<svg
								className="h-5 w-5 fill-[#24292F]"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-sm font-semibold leading-6">GitHub</span>
						</button>
					</div>

					<p className="mt-10 text-center text-sm text-gray-100">
						Already a registered user?{" "}
						<Link
							href="/login"
							className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
						>
							sign in
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
