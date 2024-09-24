"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
	return (
		<button
			onClick={() => signOut()}
			className="rounded-lg px-4 py-3 text-white bg-red-600"
		>
			Logout
		</button>
	);
};

export default Logout;
