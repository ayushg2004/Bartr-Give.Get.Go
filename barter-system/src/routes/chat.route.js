import { Router } from "express";
import {
	createChat,
	getChatByRequestId,
	getMessagesByChatId,
	sendMessage,
} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.get("/health", (req, res) => {
	const originalRoute = req.originalUrl;
	return res.send(`route "${originalRoute}" is healthy `);
});

chatRouter.post("/chats", createChat);
chatRouter.get("/chats/:barterRequestId", getChatByRequestId);
chatRouter.post("/messages", sendMessage);
chatRouter.get("/messages/:chatId", getMessagesByChatId);

export default chatRouter;
