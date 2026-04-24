import mongoose from "mongoose";

const barterItemSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		category: { type: String, required: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["Available", "Traded"],
			default: "Available",
		},
		location: { type: String, required: true },
	},
	{ timestamps: true }
);

export const BarterItem = mongoose.model("BarterItem", barterItemSchema);
