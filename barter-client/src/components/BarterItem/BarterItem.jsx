"use client";

import {
	Card,
	CardTitle,
	CardContent,
	CardHeader,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BACKEND_URL } from "@/constants";
import SelectOfferedItem from "@/components/SelectOfferedItem";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BarterItem = ({ item }) => {
	const [offeredItemId, setOfferedItemId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const handleCreateRequest = async ({ offeredItemId, requestedItemId }) => {
		if (!offeredItemId) {
			toast({
				description: "Please select an item to offer",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/api/barter-request`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ offeredItemId, requestedItemId }),
			});

			if (!response.ok) {
				toast({
					description: "Failed to create trade request",
					variant: "destructive",
				});
				throw new Error("Failed to create trade request");
			}

			const data = await response.json();
			toast({
				description: "Trade request created successfully",
			});
			console.log(data);
		} catch (error) {
			console.log("Error: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Function to determine badge color based on status
	const getBadgeClasses = (status) => {
		switch (status.toLowerCase()) {
			case "available":
				return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
			case "traded":
				return "bg-gray-100 text-gray-700 hover:bg-gray-100";
			case "pending":
				return "bg-amber-100 text-amber-700 hover:bg-amber-100";
			default:
				return "bg-purple-100 text-purple-700 hover:bg-purple-100";
		}
	};

	const handleItemSelection = (id) => {
		setOfferedItemId(id);
		if (id) {
			toast({
				description: "Item selected for trade",
			});
		}
	};

	return (
		<Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
			<CardHeader className="p-6">
				<div className="flex items-start justify-between">
					<div className="flex items-center justify-between w-full space-y-1.5">
						<CardTitle className="text-2xl font-bold tracking-tight">
							{item.title}
						</CardTitle>
						<Badge className={`${getBadgeClasses(item.status)} font-medium`}>
							{item.status}
						</Badge>
					</div>
					{item.image && (
						<div className="w-24 h-24 overflow-hidden rounded-lg">
							<img
								src={item.image || "/placeholder.svg"}
								alt={item.title}
								className="object-cover w-full h-full"
							/>
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent className="px-6 pb-4">
				{item.description && (
					<p className="text-base text-muted-foreground">{item.description}</p>
				)}

				{item.location && (
					<div className="flex items-center mt-4 text-sm text-muted-foreground">
						<MapPin className="w-4 h-4 mr-2" />
						{item.location}
					</div>
				)}

				{item.createdAt && (
					<div className="flex items-center mt-2 text-sm text-muted-foreground">
						<Clock className="w-4 h-4 mr-2" />
						Listed {new Date(item.createdAt).toLocaleDateString()}
					</div>
				)}

				<div className="mt-6">
					<h4 className="mb-2 text-sm font-semibold text-muted-foreground">
						Select Item to Trade
					</h4>
					<SelectOfferedItem
						offeredItemId={offeredItemId}
						setOfferedItemId={handleItemSelection}
					/>
				</div>
			</CardContent>

			<CardFooter className="px-6 py-4 border-t bg-muted/50">
				<div className="flex items-center justify-between w-full">
					<p className="text-sm text-muted-foreground">
						{item.status === "Available"
							? "Ready to trade"
							: item.status === "Traded"
							? "This item has been traded"
							: "Trade pending"}
					</p>
					<Button
						disabled={
							isLoading || !offeredItemId || item.status !== "Available"
						}
						onClick={() =>
							handleCreateRequest({ offeredItemId, requestedItemId: item._id })
						}
						className={`relative ${
							isLoading
								? "cursor-not-allowed"
								: item.status === "Traded"
								? "bg-gray-400 hover:bg-gray-400"
								: !offeredItemId
								? "bg-purple-400 hover:bg-purple-400"
								: "bg-purple-600 hover:bg-purple-700"
						}`}
					>
						{isLoading ? (
							<>
								<span className="mr-2">Requesting</span>
								<div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent" />
							</>
						) : (
							<>
								{item.status === "Traded"
									? "Traded"
									: item.status === "Pending"
									? "Pending"
									: "Request Trade"}
								<ArrowRight className="w-4 h-4 ml-2" />
							</>
						)}
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default BarterItem;
