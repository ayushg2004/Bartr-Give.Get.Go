import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema(
	{
		barterRequest: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BarterRequest",
			required: true,
		}, // Related barter request
		reportedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		}, // Who raised the dispute
		reason: { type: String, required: true }, // Reason for the dispute
		status: {
			type: String,
			enum: ["Pending", "Resolved", "Rejected"],
			default: "Pending",
		}, // Dispute status
		adminResponse: { type: String }, // Admin's resolution comment
	},
	{ timestamps: true }
);
export const Dispute = mongoose.model("Dispute", disputeSchema);
