"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import BarterItemForm from "./BarterItemForm";

const AddBarterItemDialog = () => {
	const [open, setOpen] = useState(false);

	const handleSubmitSuccess = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-purple-600 hover:bg-purple-700">
					<PlusCircle className="w-4 h-4 mr-2" />
					Add Item
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Barter Item</DialogTitle>
					<DialogDescription>
						Add details about the item you want to trade. Make sure to provide
						accurate information.
					</DialogDescription>
				</DialogHeader>
				<BarterItemForm
					onSubmitSuccess={handleSubmitSuccess}
					onCancel={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AddBarterItemDialog;
