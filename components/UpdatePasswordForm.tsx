"use client";
import { updatePassword } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface FormValues {
	password: string;
	confirmPassword: string;
}

const UpdatePasswordForm = ({ token }: { token: string }) => {
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
			password: "",
			confirmPassword: "",
		},
	});
	const onHandleSubmit = async (data: FormValues) => {
		try {
			setLoading(true);
			const res = await updatePassword({
				password: data.password,
				token,
			});
			if (res.status === "success") {
				toast.success(res.message);
			} else {
				toast.error(res.message);
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
						Update password
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
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									New Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										type="password"
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
									Update password
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdatePasswordForm;
