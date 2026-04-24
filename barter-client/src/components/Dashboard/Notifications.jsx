import { useState } from "react";

const Notifications = ({ notifications }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative">
			<button onClick={() => setOpen(!open)} className="relative">
				🔔
				{notifications.length > 0 && (
					<span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
						{notifications.length}
					</span>
				)}
			</button>
			{open && (
				<div className="absolute bg-white shadow-md p-2 right-0 top-8 w-64">
					<ul>
						{notifications.map((notif, index) => (
							<li key={index} className="border-b p-2">{notif}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Notifications;
