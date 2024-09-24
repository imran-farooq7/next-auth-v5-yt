import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
	return (
		<div className="flex justify-between px-5 py-3 items-center bg-slate-300 shadow-2xl">
			<ul className="flex items-center gap-4">
				<li>
					<Link href={"/myapp"}>My App</Link>
				</li>
				<li>
					{" "}
					<Link href={"/changepassword"}>Change Password</Link>
				</li>
			</ul>
			<Logout />
		</div>
	);
};

export default Navbar;
