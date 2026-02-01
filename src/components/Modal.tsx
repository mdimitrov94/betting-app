export const Modal = ({
	children,
	onClose,
}: {
	children: React.ReactNode;
	onClose: () => void;
}) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-gray-800 rounded-lg max-w-2xl w-full pb-8 max-h-[90vh] overflow-y-auto relative">
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
};
