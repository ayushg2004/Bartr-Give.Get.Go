"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";

const categories = [
	"Electronics",
	"Furniture",
	"Clothing",
	"Books",
	"Sports",
	"Others",
];

const BarterItemForm = ({
	onSubmitSuccess,
	onCancel,
	submitButtonText = "Add Item",
}) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		location: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCategoryChange = (value) => {
		setFormData((prev) => ({ ...prev, category: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/api/barter-items`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
				credentials: "include",
			});
			const data = await response.json();
			if (response.ok) {
				setFormData({
					title: "",
					description: "",
					category: "",
					location: "",
				});

				if (onSubmitSuccess) {
					toast({
						description: "Item Added successfully",
					});
					onSubmitSuccess(data);
				}
			} else {
				toast({
					description: data.message,
				});
				throw new Error(data.message);
			}
		} catch (error) {
			console.error("Error adding item:", error);
			alert(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid gap-4 py-4">
				<div className="grid gap-2">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="What are you offering?"
						required
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Describe your item in detail..."
						required
						className="min-h-[100px]"
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="category">Category</Label>
					<Select
						value={formData.category}
						onValueChange={handleCategoryChange}
						required
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category} value={category.toLowerCase()}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="location">Location</Label>
					<Input
						id="location"
						name="location"
						value={formData.location}
						onChange={handleChange}
						placeholder="Where is the item located?"
						required
					/>
				</div>
			</div>
			<div className="flex justify-end gap-2 mt-4">
				{onCancel && (
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancel
					</Button>
				)}
				<Button
					type="submit"
					disabled={isLoading}
					className="bg-purple-600 hover:bg-purple-700"
				>
					{isLoading ? (
						<>
							<span className="mr-2">Adding</span>
							<div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent" />
						</>
					) : (
						submitButtonText
					)}
				</Button>
			</div>
		</form>
	);
};

export default BarterItemForm;
