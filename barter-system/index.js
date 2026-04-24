import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import connectDB from "./src/connectDB.js";
import userRouter from "./src/routes/user.route.js";
import barterItemRouter from "./src/routes/barterItem.route.js";
import verifyJWT from "./src/middlewares/auth.middleware.js";
import barterRequestRouter from "./src/routes/barterRequest.route.js";
import chatRouter from "./src/routes/chat.route.js";
import reviewRouter from "./src/routes/review.route.js";
import disputeRouter from "./src/routes/dispute.route.js";
import cors from "cors";
import forumRoutes from "./src/routes/forum.router.js";
const app = express();

const PORT = process.env.PORT || 8888;

dotenv.config();
connectDB();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(cookieParser());

const server = http.createServer(app);

export const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST"],
	},
});

// Store for online users by room
const onlineUsers = {};

// Update the socket.io connection handler in your server
io.on("connection", (socket) => {
	console.log(`User connected: ${socket.id}`);

	// Join a chat room with user ID
	socket.on("joinChat", (chatId, userId) => {
		if (!chatId || !userId) return;

		// Store user's socket ID with chat and user info
		socket.chatId = chatId;
		socket.userId = userId;

		// Join the room
		socket.join(chatId.toString());
		console.log(`User ${userId} joined chat: ${chatId}`);

		// Initialize room if not exists
		if (!onlineUsers[chatId]) {
			onlineUsers[chatId] = {};
		}

		// Mark user as online
		onlineUsers[chatId][userId] = true;

		// Broadcast online users to everyone in the room
		io.to(chatId.toString()).emit("userStatus", onlineUsers[chatId]);
	});

	// Handle typing indicator
	socket.on("typing", (data) => {
		socket.to(data.chatId.toString()).emit("userTyping", {
			userId: data.userId,
		});
	});

	// Handle stop typing
	socket.on("stopTyping", (data) => {
		socket.to(data.chatId.toString()).emit("userStoppedTyping", {
			userId: data.userId,
		});
	});

	// Handle user disconnect
	socket.on("disconnect", () => {
		const { chatId, userId } = socket;
		console.log(`User disconnected: ${socket.id}`);

		// Remove user from online list
		if (chatId && userId && onlineUsers[chatId]) {
			delete onlineUsers[chatId][userId];

			// Broadcast updated online users
			io.to(chatId.toString()).emit("userStatus", onlineUsers[chatId]);
		}
	});
});

app.get("/health", (req, res) => {
	const originalRoute = req.originalUrl;
	return res.send(`route "${originalRoute}" is healthy `);
});

app.use("/api/users", userRouter);
app.use("/api/barter-items", barterItemRouter); // GET is public; auth is handled per-route inside
app.use("/api/barter-request", verifyJWT, barterRequestRouter);
app.use("/api/reviews", verifyJWT, reviewRouter);
app.use("/api/dispute", verifyJWT, disputeRouter);
app.use("/api", verifyJWT, chatRouter);
app.use("/api/forum", verifyJWT,forumRoutes);
server.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
