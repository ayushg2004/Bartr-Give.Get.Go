import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowRightLeft,
	MapPin,
	User,
	Check,
	LoaderCircle,
	MessageSquareText,
	X,
} from "lucide-react";

import { Button } from "../ui/button";
import { BACKEND_URL } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../StarRating";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const TradeRequestCard = ({ tradeRequest }) => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { user } = useAuth();
	const { toast } = useToast();

	const handleChangeStatus = async (status) => {
		if (!status) {
			toast({
				description: "Invalid status",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch(
				`${BACKEND_URL}/api/barter-request/${tradeRequest._id}/status`,
				{
					method: "PUT",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ status }),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				toast({
					description: data.message,
					variant: "destructive",
				});
				throw new Error("Failed to update status");
			}

			tradeRequest.status = status;
			toast({
				description: `Status updated to ${status} successfully`,
			});
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleMarkAsCompleted = async () => {
		setIsLoading(true);
	  
		try {
		  const response = await fetch(
			`${BACKEND_URL}/api/barter-request/${tradeRequest._id}`,
			{
			  method: "PUT",
			  credentials: "include",
			  headers: { "Content-Type": "application/json" },
			}
		  );
	  
		  const data = await response.json();
	  
		  if (!response.ok) {
			toast({
			  description: data.message,
			  variant: "destructive",
			});
			throw new Error("Failed to update completion status");
		  }
	  
		  tradeRequest.status = data.barterRequest.status;
		  toast({
			description: "Marked as completed successfully!",
		  });
		} catch (error) {
		  console.error("Error:", error);
		} finally {
		  setIsLoading(false);
		}
	};
	  

	const handleCreateChat = async () => {
		setIsLoading(true);

		try {
			const response = await fetch(`${BACKEND_URL}/api/chats`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ barterRequestId: tradeRequest._id }),
			});

			if (!response.ok) {
				toast({
					description: "Failed to create chat",
					variant: "destructive",
				});
				throw new Error("Failed to create chat");
			}

			await response.json();
			navigate(`/barter-request/chat/${tradeRequest._id}`);
		} catch (error) {
			console.error("Error in chat creation:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRating = async (rating) => {
		// Validate the rating
		if (rating < 1 || rating > 5) {
			toast({
				description: "Invalid rating value. Rating must be between 1 and 5.",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);

		// Prepare the payload
		const reviewedUserId =
			tradeRequest.receiver === user._id
				? tradeRequest.sender._id
				: tradeRequest.receiver;
		const payload = {
			reviewedUserId,
			barterRequestId: tradeRequest._id,
			rating,
			comment: "Default comment", // You can make this dynamic if needed
		};

		try {
			const response = await fetch(`${BACKEND_URL}/api/reviews`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			// Check if the request was successful
			if (!response.ok) {
				toast({
					description: `Failed to submit rating: ${response.statusText}`,
					variant: "destructive",
				});
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			toast({
				description: "Rating submitted successfully",
			});
			console.log("Rating submitted successfully:", data);
		} catch (error) {
			console.error("Error in rating:", error.message || error);
		} finally {
			setIsLoading(false);
		}
	};

	// Function to determine badge color based on status
	const getBadgeColor = (status) => {
		switch (status.toLowerCase()) {
			case "accepted":
				return "bg-green-100 text-green-700 hover:bg-green-200";
			case "rejected":
				return "bg-red-100 text-red-700 hover:bg-red-200";
			case "pending":
				return "bg-amber-100 text-amber-700 hover:bg-amber-200";
			case "completed":
				return "bg-blue-100 text-blue-700 hover:bg-blue-200";
			default:
				return "bg-gray-100 text-gray-700 hover:bg-gray-200";
		}
	};

	return (
		<Card className="w-full max-w-md transition-all duration-300 border-none shadow-md hover:shadow-lg">
			<CardHeader className="p-6">
				<CardTitle className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<User className="w-5 h-5 text-gray-500" />
						<div>
							<p className="font-semibold">{tradeRequest.sender.name}</p>
							<p className="text-sm text-gray-500">
								{tradeRequest.sender.email}
							</p>
						</div>
					</div>
					<div className="flex items-center space-x-3">
						<Button
							onClick={handleCreateChat}
							variant="ghost"
							size="icon"
							className="mx-2 hover:bg-gray-100"
							disabled={isLoading}
						>
							{isLoading ? (
								<LoaderCircle
									className="text-gray-600 animate-spin"
									size={18}
								/>
							) : (
								<MessageSquareText className="text-gray-600" />
							)}
						</Button>
						<Badge
							className={`${getBadgeColor(tradeRequest.status)} font-medium`}
						>
							{tradeRequest.status}
						</Badge>
					</div>
				</CardTitle>
			</CardHeader>

			<CardContent className="px-6 pb-4 space-y-4">
				{/* Trade Items */}
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<p className="font-medium">Offered Item</p>
						<p className="text-gray-800">{tradeRequest.offeredItem.title}</p>
						<div className="flex items-center text-sm text-gray-500">
							<MapPin className="w-4 h-4 mr-1" />
							{tradeRequest.offeredItem.location}
						</div>
					</div>
					<ArrowRightLeft className="w-6 h-6 text-gray-400" />
					<div className="space-y-1">
						<p className="font-medium">Requested Item</p>
						<p className="text-gray-800">{tradeRequest.requestedItem.title}</p>
						<div className="flex items-center text-sm text-gray-500">
							<MapPin className="w-4 h-4 mr-1" />
							{tradeRequest.requestedItem.location}
						</div>
					</div>
				</div>

				{/* Date Created */}
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-500">
						Created: {new Date(tradeRequest.createdAt).toLocaleDateString()}
					</div>
					{tradeRequest.status === "Completed" && (
						<StarRating
							size="sm"
							onRatingChange={handleRating}
							disabled={isLoading}
						/>
					)}
					{/* Status Buttons */}
					{tradeRequest.status === "Pending" && (
						<CardFooter className="flex justify-end gap-3 px-6 py-4">
							<Button
								onClick={() => handleChangeStatus("Accepted")}
								size="icon"
								className="p-2 bg-green-200 hover:bg-green-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<LoaderCircle className="text-green-500 animate-spin" size={20} />
								) : (
									<Check className="text-green-700" size={20} />
								)}
							</Button>
							<Button
								onClick={() => handleChangeStatus("Rejected")}
								size="icon"
								className="p-2 bg-red-200 hover:bg-red-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<LoaderCircle className="text-red-500 animate-spin" size={20} />
								) : (
									<X className="text-red-700" size={20} />
								)}
							</Button>
						</CardFooter>
					)}
					{/* Mark complete Button */}
					{tradeRequest.status === "Accepted" && (
						<CardFooter className="flex items-end justify-center p-0">
							<Button
							onClick={handleMarkAsCompleted}
							size="sm"

							disabled={isLoading}
							>
							{isLoading ? (
								<LoaderCircle className="animate-spin" size={20} />
							) : (
								"Mark as Completed"
							)}
							</Button>
						</CardFooter>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default TradeRequestCard;
