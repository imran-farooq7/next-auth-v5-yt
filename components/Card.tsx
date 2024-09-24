export default function Card({ children }: { children: React.ReactNode }) {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow">
			<div className="px-4 py-5 sm:p-6 flex flex-col gap-4">{children}</div>
		</div>
	);
}
