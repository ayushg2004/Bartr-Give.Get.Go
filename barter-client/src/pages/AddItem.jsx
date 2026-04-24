"use client";

import { useNavigate } from "react-router-dom";
import BarterItemForm from "@/components/BarterItem/BarterItemForm";

const AddItem = () => {
	const navigate = useNavigate();

	const handleSubmitSuccess = () => {
		// Redirect to my items or dashboard after successful submission
		navigate("/my-barter-items");
	};

	const handleCancel = () => {
		// Go back when cancel is clicked
		navigate(-1);
	};

	return (
		<div className="container max-w-2xl py-8 mx-auto">
			<h1 className="mb-6 text-2xl font-bold">Add New Barter Item</h1>
			<div className="p-6 bg-white rounded-lg shadow-sm">
				<BarterItemForm
					onSubmitSuccess={handleSubmitSuccess}
					onCancel={handleCancel}
					submitButtonText="Create Item"
				/>
			</div>
		</div>
	);
};

export default AddItem;
