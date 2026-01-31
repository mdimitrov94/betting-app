export function Loader() {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="flex flex-col items-center gap-4">
				<div className="relative w-12 h-12">
					<div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
					<div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
				</div>
				<p className="text-white font-semibold">Loading...</p>
			</div>
		</div>
	);
}
