import { BarterItem } from "../models/barterItem.model.js";
import { BarterRequest } from "../models/barterRequest.model.js";
/*
    Flow:
    Users can send barter requests by selecting an item they want and offering one of their own.
    Requests can be accepted, rejected, or completed.
    Status updates (Pending, Accepted, Rejected, Completed) are tracked.
*/

//! create new barter request
export const createBarterRequest = async (req, res) => {
	const { offeredItemId, requestedItemId } = req.body;

	if (!offeredItemId || !requestedItemId)
		return res
			.status(402)
			.json({ message: "offerItemId and requestItemId must needed" });

	try {
		const offeredItem = await BarterItem.findById(offeredItemId);
		const requestedItem = await BarterItem.findById(requestedItemId);

		if (!offeredItem || !requestedItem) {
			return res.status(404).json({ message: "One or both items not found" });
		}

		if (offeredItem.owner.toString() === requestedItem.owner.toString()) {
			return res.status(400).json({ message: "Cannot trade with yourself" });
		}

		const barterRequest = await BarterRequest.create({
			offeredItem: offeredItemId,
			requestedItem: requestedItemId,
			sender: req.user._id,
			receiver: requestedItem.owner,
			status: "Pending",
		});

		res.status(201).json(barterRequest);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//! fetch all request for user
export const getUserBarterRequest = async (req, res) => {
	try {
		const barterRequests = await BarterRequest.find({
			$or: [{ receiver: req.params.userId }, { sender: req.params.userId }],
		}).populate(
			"offeredItem requestedItem sender",
			"title name email location"
		);

		res.status(200).json(barterRequests);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//! update the status of the barter request
export const updateBarterRequestStatus = async (req, res) => {
	const { status } = req.body;

	try {
		const barterRequest = await BarterRequest.findById(req.params.id);

		if (!barterRequest) {
			return res.status(404).json({ message: "Barter request not found" });
		}

		// Only the receiver can update the request status
		if (barterRequest.receiver.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ message: "Not authorized to update this request" });
		}

		barterRequest.status = status;
		await barterRequest.save();

		res.status(200).json(barterRequest);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const markAsCompleted = async (req, res) => {
	try {
		const { barterRequestId } = req.params;
		const userId = req.user._id; // Get the logged-in user

		const barterRequest = await BarterRequest.findById(barterRequestId);
		console.log("barterRequest",barterRequest);
		if (!barterRequest) {
			return res.status(404).json({ message: "Barter request not found" });
		}

		// Ensure the user is either sender or receiver
		if (
			barterRequest.sender.toString() !== userId.toString() &&
			barterRequest.receiver.toString() !== userId.toString()
		) {
			return res.status(403).json({ message: "Unauthorized to complete this trade" });
		}

		// Check if user has already marked it as completed
		if (!barterRequest.completedBy) {
			barterRequest.completedBy = [];
		}
		if (!barterRequest.completedBy.includes(userId.toString())) {
			barterRequest.completedBy.push(userId);
		}
		console.log("completed by",barterRequest.completedBy);
		
		// If both users marked as completed, update the status
		if (
			barterRequest.completedBy.includes(barterRequest.sender.toString()) &&
			barterRequest.completedBy.includes(barterRequest.receiver.toString())
		) {
			barterRequest.status = "Completed";
			await BarterItem.updateMany(
				{ _id: { $in: [barterRequest.offeredItem, barterRequest.requestedItem] } },
				{ $set: { status: "Traded" } }
			  );
			  
		}

		await barterRequest.save();
		
		res.status(200).json({ message: "Completion status updated", barterRequest });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

