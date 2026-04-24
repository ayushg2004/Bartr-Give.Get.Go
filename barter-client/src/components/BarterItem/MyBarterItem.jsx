import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon } from "lucide-react";

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

// Function to get badge color based on item status
const getBadgeColor = (status) => {
	switch (status.toLowerCase()) {
		case "available":
			return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
		case "traded":
			return "bg-gray-100 text-gray-700 hover:bg-gray-200";
		case "pending":
			return "bg-amber-100 text-amber-700 hover:bg-amber-200";
		default:
			return "bg-purple-100 text-purple-700 hover:bg-purple-200";
	}
};

function MyBarterItem({ item }) {
	return (
		<Card className="w-full max-w-md overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg">
			{/* Image Section (Optional) */}
			{item.image && (
				<div className="h-40 w-full overflow-hidden bg-gray-100">
					<img
						src={item.image || "/placeholder.svg"}
						alt={item.title}
						className="h-full w-full object-cover"
					/>
				</div>
			)}

			<CardHeader className="p-6">
				<div className="flex items-start justify-between">
					<CardTitle className="text-xl font-bold">{item.title}</CardTitle>
					<Badge className={`${getBadgeColor(item.status)} font-medium`}>
						{item.status}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="px-6 pb-4 space-y-4">
				{item.description && (
					<p className="text-sm text-muted-foreground">{item.description}</p>
				)}

				{/* Location */}
				{item.location && (
					<div className="flex items-center text-sm text-muted-foreground">
						<MapPinIcon className="w-4 h-4 mr-2" />
						{item.location}
					</div>
				)}

				{/* Date */}
				{item.createdAt && (
					<div className="flex items-center text-sm text-muted-foreground">
						<CalendarIcon className="w-4 h-4 mr-2" />
						<span>Listed on {formatDate(item.createdAt)}</span>
					</div>
				)}
			</CardContent>

			<CardFooter className="border-t bg-muted/50 px-6 py-4">
				<div className="flex w-full items-center justify-between">
					{/* Category Badge */}
					<Badge variant="outline" className="text-xs font-medium px-2 py-1">
						{item.category}
					</Badge>

					{/* Item ID */}
					<span className="text-xs text-muted-foreground font-mono">
						ID: {item._id.slice(0, 8)}
					</span>
				</div>
			</CardFooter>
		</Card>
	);
}

export default MyBarterItem;
