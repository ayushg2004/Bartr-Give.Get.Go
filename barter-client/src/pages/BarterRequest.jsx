import TradeRequestCard from "@/components/BarterRequest/TradeRequestCard";
import { BACKEND_URL } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function BarterRequest() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useAuth();
	const getAllRequest = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${BACKEND_URL}/api/barter-request/user/${user._id}`,
				{
					credentials: "include",
					method: "GET",
				}
			);
			const data = await response.json();
			console.log(data);
			setItems(data);
		} catch (error) {
			console.log("Error: ", error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		getAllRequest();
	}, []);

	if (isLoading)
		return <div className="p-4 bg-gray-600 rounded-sm ">Loading data...</div>;

	return (
		<div className="flex flex-col md:flex-row h-screen">
			{/* Left Side: Barter Requests */}
			<div className="md:w-1/2 lg:w-2/5 p-6 overflow-auto border-r border-gray-200">
				<h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
					Barter Requests
				</h1>
				
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
					{items.map((item) => (
						<TradeRequestCard key={item._id} tradeRequest={item} />
					))}
				</div>
			</div>

			{/* Right Side: Chat Section (Takes More Space) */}
			<div className="flex-1 bg-gray-100 overflow-auto">
				<Outlet />
			</div>
		</div>

	);
}

export default BarterRequest;
