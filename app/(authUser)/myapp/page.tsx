import { auth } from "@/auth";
import Card from "@/components/Card";

const MyAppPage = async () => {
	const session = await auth();
	return (
		<Card>
			<p>My Account</p>
			<h6 className="text-emerald-500 font-semibold">Email</h6>
			<p>{session?.user?.email}</p>
		</Card>
	);
};

export default MyAppPage;
