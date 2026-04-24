import mongoose from "mongoose";
import { io } from "../../index.js";
import { BarterRequest } from "../models/barterRequest.model.js";
import { Chat, Message } from "../models/chat.model.js";

// Create a new chat for a barter request
export const createChat = async (req, res) => {
	const { barterRequestId } = req.body;

	if (!mongoose.Types.ObjectId.isValid(barterRequestId)) {
		return res.status(400).json({ message: "Invalid barter request ID" });
	}

	try {
		const barterRequest = await BarterRequest.findById(barterRequestId);
		if (!barterRequest) {
			return res.status(404).json({ message: "Barter request not found" });
		}

		// Check if chat already exists
		let chat = await Chat.findOne({ barterRequestId }).populate(
			"participants",
			"name email"
		);

		if (!chat) {
			chat = await Chat.create({
				barterRequestId,
				participants: [barterRequest.sender, barterRequest.receiver],
			});
			chat = await chat.populate("participants", "name email");
		}

		// Notify relevant users about new chat
		io.emit("chatCreated", { chat });

		return res.status(201).json(chat);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Get chat by barter request ID
export const getChatByRequestId = async (req, res) => {
	const { barterRequestId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(barterRequestId)) {
		return res.status(400).json({ message: "Invalid barter request ID" });
	}

	try {
		const chat = await Chat.findOne({ barterRequestId }).populate(
			"participants",
			"name email"
		);

		if (!chat) {
			return res.status(404).json({ message: "Chat not found" });
		}

		// Get messages for this chat
		const messages = await Message.find({ chatId: chat._id })
			.populate("sender", "name email")
			.sort({ createdAt: 1 });

		res.status(200).json({
			chat,
			messages,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Send a message in a chat
// Modified sendMessage controller function
export const sendMessage = async (req, res) => {
	const { chatId, content } = req.body;

	if (!mongoose.Types.ObjectId.isValid(chatId)) {
		return res.status(400).json({ message: "Invalid chat ID" });
	}

	try {
		const chat = await Chat.findById(chatId);
		if (!chat) {
			return res.status(404).json({ message: "Chat not found" });
		}

		// Create and save the message
		const message = await Message.create({
			chatId,
			sender: req.user._id,
			content,
		});

		// Populate the sender field for the response
		const populatedMessage = await Message.findById(message._id).populate(
			"sender",
			"name email"
		);

		// Emit to the specific chat room
		io.to(chatId.toString()).emit("newMessage", populatedMessage);

		// Return the populated message
		res.status(201).json(populatedMessage);
	} catch (error) {
		console.error("Error in sendMessage:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//! Fetch all messages for a specific chat
export const getMessagesByChatId = async (req, res) => {
	const { chatId } = req.params;

	// Validate chatId
	if (!mongoose.Types.ObjectId.isValid(chatId)) {
		return res.status(400).json({ message: "Invalid chat ID" });
	}

	try {
		const messages = await Message.find({ chatId })
			.populate("sender", "name email")
			.sort({ createdAt: 1 });

		return res.status(200).json(messages);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "Server error", error: error.message });
	}
};
