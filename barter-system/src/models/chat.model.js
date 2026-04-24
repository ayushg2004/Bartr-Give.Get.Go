import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

const chatSchema = new mongoose.Schema(
	{
		barterRequestId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BarterRequest",
			required: true,
		},
		participants: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		],
	},
	{ timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);

export const Message = mongoose.model("Message", messageSchema);
