import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	if (!session?.user) {
		redirect("/login");
	}
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex flex-1 justify-center items-center">
				{children}
			</main>
		</div>
	);
};

export default layout;
