import { BarterItem } from "../models/barterItem.model.js";
/*
    Flow:
    User lists an item/service for barter by providing details (title, description, category, location).
    Items are stored with their status (Available, Traded).
    Users can view and update their listed items.
*/

//! Add a new item for barter
export const createBarterItem = async (req, res) => {
	const { title, description, category, location } = req.body;

	try {
		if (!title || !description || !category || !location)
			return res.status(401).json({ message: "Please provide required field" });

		const barterItem = await BarterItem.create({
			title,
			description,
			category,
			location,
			status: "Available",
			owner: req.user._id,
		});

		res
			.status(201)
			.json({ message: "Barter Item created successfully", data: barterItem });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//! fetch all available barter items
export const getAllBarterItems = async (req, res) => {
	try {
		const barterItems = await BarterItem.find({ status: "Available" }).populate(
			"owner",
			"-_id name location"
		);

		res.status(200).json({
			message: "all barter items fetched successfully",
			data: barterItems,
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//! fetch items listed by specific user
export const getUserBarterItems = async (req, res) => {
	try {
		const userId = req.params.userId;
		if (!userId)
			return res
				.status(400)
				.json({ message: "userId is required but not found" });

		const barterItems = await BarterItem.find({ owner: userId });
		res
			.status(200)
			.json({ message: "barterItems fetched successfully", data: barterItems });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// //! update item status after trade completion
export const updateBarterItemStatus = async (req, res) => {
	const { status } = req.body;
	try {
		const barterItem = await BarterItem.findById(req.params.id);
		if (!barterItem) {
			return res.status(404).json({ message: "Barter item not found" });
		}
		// Check if the requesting user is the item owner
		if (barterItem.user.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ message: "Not authorized to update this item" });
		}
		barterItem.status = status;
		await barterItem.save();
		res.status(200).json({
			message: "barter item status updated successfully",
			data: barterItem,
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

