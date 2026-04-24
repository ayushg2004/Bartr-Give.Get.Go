import mongoose from "mongoose";

const barterRequestSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		offeredItem: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BarterItem",
			required: true,
		},
		requestedItem: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BarterItem",
			required: true,
		},
		status: {
			type: String,
			enum: ["Pending", "Accepted", "Rejected", "Completed"],
			default: "Pending",
		},
		completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}], // ✅ Ensure this field exists
		
	},
	{ timestamps: true }
);

export const BarterRequest = mongoose.model(
	"BarterRequest",
	barterRequestSchema
);
