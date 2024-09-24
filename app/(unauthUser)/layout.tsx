import { auth } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	if (session?.user) {
		redirect("/myapp");
	}
	return <div>{children}</div>;
};

export default layout;
