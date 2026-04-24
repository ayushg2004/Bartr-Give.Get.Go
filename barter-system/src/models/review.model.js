import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		reviewer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		reviewedUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		rating: { type: Number, min: 1, max: 5, required: true },
		barterRequestId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BarterRequest",
			required: true,
		},
		comment: { type: String },
	},
	{ timestamps: true }
);

// todo update the reputation of both the user

export const Review = mongoose.model("Review", reviewSchema);
