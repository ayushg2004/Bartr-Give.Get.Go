import { BACKEND_URL } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import MyBarterItem from "@/components/BarterItem/MyBarterItem";

function MyBarterItems() {
	const { user } = useAuth();
	const [items, setItems] = useState([]);

	const getMyBarterItems = async () => {
		if (!user) return; // Prevent request if user is not loaded
		try {
			const response = await fetch(
				`${BACKEND_URL}/api/barter-items/user/${user._id}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			if (!response.ok) throw new Error("Failed to fetch items");

			const data = await response.json();
			setItems(data.data);
		} catch (error) {
			console.error("Error fetching barter items:", error);
		}
	};

	useEffect(() => {
		getMyBarterItems();
	}, [user]); // Now updates when user changes

	return (
		<div className="container mx-auto p-6">
			{/* Title Section */}
			<h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
				My Barter Items
			</h1>

			{/* Grid Layout for Items */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{items.length > 0 ? (
				items.map((item) => <MyBarterItem key={item._id} item={item} />)
			) : (
				<p>No barter items found.</p>
			)}
			</div>
		</div>
		
	);
}

export default MyBarterItems;
