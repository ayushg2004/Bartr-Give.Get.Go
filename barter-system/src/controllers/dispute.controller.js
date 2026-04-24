import { BarterRequest } from "../models/barterRequest.model.js";
import { Dispute } from "../models/dispute.model.js";

//! summit a dispute for a barter request
export const createDispute = async (req, res) => {
	const { barterRequestId, reason } = req.body;

	try {
		const barterRequest = await BarterRequest.findById(barterRequestId);
		if (!barterRequest) {
			return res.status(404).json({ message: "Barter request not found" });
		}

		// Prevent duplicate disputes for the same transaction
		const existingDispute = await Dispute.findOne({
			barterRequest: barterRequestId,
			reportedBy: req.user._id,
		});
		if (existingDispute) {
			return res
				.status(400)
				.json({ message: "Dispute already raised for this trade" });
		}

		const dispute = await Dispute.create({
			barterRequest: barterRequestId,
			reportedBy: req.user._id,
			reason,
		});

		res.status(201).json(dispute);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//! fetch all dispute for admin review
export const getDisputes = async (req, res) => {
	try {
		const disputes = await Dispute.find()
			.populate("barterRequest", "offeredItem requestedItem")
			.populate("reportedBy", "name email")
			.select("reason status adminResponse createdAt");

		res.status(200).json(disputes);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//! resolve dispute by admin
export const resolveDispute = async (req, res) => {
	const { disputeId } = req.params;
	const { status, adminResponse } = req.body;

	try {
		const dispute = await Dispute.findById(disputeId);
		if (!dispute) {
			return res.status(404).json({ message: "Dispute not found" });
		}

		dispute.status = status;
		dispute.adminResponse = adminResponse;
		await dispute.save();

		res.status(200).json({ message: "Dispute resolved", dispute });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
