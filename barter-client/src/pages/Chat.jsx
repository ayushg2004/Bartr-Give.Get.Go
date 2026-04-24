"use client";

import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { BACKEND_URL } from "@/constants";
import { Cross, Send, User } from "lucide-react";

const Chat = () => {
	const { barterRequestId } = useParams();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [chat, setChat] = useState(null);
	const socketRef = useRef(null);
	const messagesEndRef = useRef(null);
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	// State variables for online status and typing indicators
	const [onlineUsers, setOnlineUsers] = useState({});
	const [typingUsers, setTypingUsers] = useState({});
	const typingTimeoutRef = useRef(null);

	// Initialize socket once
	useEffect(() => {
		socketRef.current = io(BACKEND_URL, {
			withCredentials: true,
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, []);

	// Fetch chat and join room
	useEffect(() => {
		if (!barterRequestId || !socketRef.current) return;

		const fetchChat = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`${BACKEND_URL}/api/chats/${barterRequestId}`,
					{
						method: "GET",
						credentials: "include",
					}
				);

				if (!response.ok) {
					throw new Error(`Failed to fetch chat: ${response.status}`);
				}

				const data = await response.json();
				setChat(data.chat);
				setMessages(data.messages || []);

				// Join chat room after we have the chat data
				if (data.chat && data.chat._id) {
					console.log(`Joining chat room: ${data.chat._id}`);
					socketRef.current.emit("joinChat", data.chat._id);
				}
			} catch (error) {
				console.error("Error fetching chat:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchChat();
	}, [barterRequestId]);

	// Handle online status and typing indicators
	useEffect(() => {
		if (!socketRef.current || !chat) return;

		// Handle user online status updates
		const handleUserStatus = (users) => {
			console.log("Online users updated:", users);
			setOnlineUsers(users);
		};

		// Handle typing indicators
		const handleTyping = (data) => {
			console.log("User typing:", data);
			setTypingUsers((prev) => ({
				...prev,
				[data.userId]: true,
			}));
		};

		const handleStopTyping = (data) => {
			console.log("User stopped typing:", data);
			setTypingUsers((prev) => {
				const updated = { ...prev };
				delete updated[data.userId];
				return updated;
			});
		};

		// Join room and announce presence
		socketRef.current.emit("joinChat", chat._id, user._id);

		// Listen for events
		socketRef.current.on("userStatus", handleUserStatus);
		socketRef.current.on("userTyping", handleTyping);
		socketRef.current.on("userStoppedTyping", handleStopTyping);

		return () => {
			socketRef.current.off("userStatus", handleUserStatus);
			socketRef.current.off("userTyping", handleTyping);
			socketRef.current.off("userStoppedTyping", handleStopTyping);
		};
	}, [chat, user?._id]);

	// Listen for new messages
	useEffect(() => {
		if (!socketRef.current) return;

		const handleNewMessage = (messageData) => {
			console.log("Received new message:", messageData);

			// Handle both possible message formats
			const newMsg = messageData.message || messageData;
			setMessages((prev) => [...prev, newMsg]);
		};

		socketRef.current.on("newMessage", handleNewMessage);

		return () => {
			socketRef.current.off("newMessage", handleNewMessage);
		};
	}, []);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	// Update input onChange to handle typing status
	const handleInputChange = (e) => {
		setNewMessage(e.target.value);

		// Don't emit typing events for empty input
		if (!e.target.value.trim() || !chat?._id) return;

		// Send typing indicator
		socketRef.current.emit("typing", {
			chatId: chat._id,
			userId: user._id,
		});

		// Clear existing timeout
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		// Set timeout to stop typing indicator after 2 seconds of inactivity
		typingTimeoutRef.current = setTimeout(() => {
			socketRef.current.emit("stopTyping", {
				chatId: chat._id,
				userId: user._id,
			});
		}, 2000);
	};

	// Send message
	const sendMessage = async (e) => {
		e.preventDefault();
		if (!newMessage.trim() || !chat?._id) return;

		try {
			const response = await fetch(`${BACKEND_URL}/api/messages`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chatId: chat._id,
					content: newMessage,
				}),
			});

			if (!response.ok) {
				throw new Error(`Failed to send message: ${response.status}`);
			}

			// Clear input immediately for better UX
			setNewMessage("");
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	// Format timestamp
	const formatTime = (timestamp) => {
		if (!timestamp) return "";
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="w-12 h-12 border-4 rounded-full border-t-blue-500 border-b-blue-500 animate-spin"></div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-screen text-sm bg-gray-50 dark:bg-gray-900">
			{/* Chat header */}
			<div className="p-3 bg-white border-b shadow-sm dark:bg-gray-800">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full dark:bg-blue-900">
							<User className="w-4 h-4 text-blue-600 dark:text-blue-300" />
						</div>
						<div>
							<h2 className="text-sm font-semibold dark:text-white">
								{chat?.participants?.find((p) => p._id !== user?._id)
									?.username || "Chat"}
							</h2>
							<div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
								{Object.keys(onlineUsers).length > 1 ? (
									<div className="flex items-center">
										<div className="w-2 h-2 mr-1 bg-green-500 rounded-full"></div>
										<span>Online</span>
									</div>
								) : (
									<div className="flex items-center">
										<div className="w-2 h-2 mr-1 bg-gray-400 rounded-full"></div>
										<span>Offline</span>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<Link to={'/barter-request'}>
							<Cross className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer rotate-45" />
						</Link>
						<div className="text-xs text-gray-500 dark:text-gray-400">
							Barter ID: {barterRequestId?.substring(0, 8)}...
						</div>
					</div>
				</div>
			</div>

			{/* Messages container */}
			<div className="flex-1 p-3 overflow-y-auto bg-gray-50 dark:bg-gray-900">
				{messages.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-sm text-gray-500 dark:text-gray-400">
						<div className="flex items-center justify-center w-12 h-12 mb-3 bg-gray-100 rounded-full dark:bg-gray-800">
							<Send className="w-6 h-6" />
						</div>
						<p>No messages yet. Start the conversation!</p>
					</div>
				) : (
					messages.map((message, idx) => {
						const isCurrentUser = message.sender._id === user._id;
						const showSenderName =
							idx === 0 || messages[idx - 1]?.sender._id !== message.sender._id;

						return (
							<div
								key={message._id || idx}
								className={`flex mb-3 ${
									isCurrentUser ? "justify-end" : "justify-start"
								}`}
							>
								<div className="max-w-[70%]">
									{showSenderName && (
										<div
											className={`text-xs text-gray-500 dark:text-gray-400 mb-1 ${
												isCurrentUser ? "text-right" : "text-left"
											}`}
										>
											{isCurrentUser ? "You" : message.sender.username}
										</div>
									)}
									<div
										className={`p-2 rounded-lg ${
											isCurrentUser
												? "bg-blue-300 text-white rounded-br-none"
												: "bg-white dark:bg-gray-800 dark:text-gray-100 rounded-bl-none border dark:border-gray-700"
										}`}
									>
										<div className="flex gap-5">
											<p className="text-sm text-black break-words whitespace-pre-wrap">
												{message.content}
											</p>
											<div className="mt-2 text-xs text-right text-gray-500 dark:text-gray-400">
												{formatTime(message.createdAt)}
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Typing indicator */}
			{Object.keys(typingUsers).length > 0 && (
				<div className="px-3 py-2 bg-white border-t dark:bg-gray-800 dark:border-gray-700">
					<div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
						<div className="flex mr-2 space-x-1">
							<div
								className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
								style={{ animationDelay: "0ms" }}
							></div>
							<div
								className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
								style={{ animationDelay: "150ms" }}
							></div>
							<div
								className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
								style={{ animationDelay: "300ms" }}
							></div>
						</div>
						<span>typing...</span>
					</div>
				</div>
			)}

			{/* Message form */}
			<form
				onSubmit={sendMessage}
				className="p-3 bg-white border-t dark:bg-gray-800 dark:border-gray-700"
			>
				<div className="flex gap-2">
					<input
						type="text"
						value={newMessage}
						onChange={handleInputChange}
						placeholder="Type a message..."
						className="flex-1 p-2 text-sm border rounded-full dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
					/>
					<button
						type="submit"
						className="p-2 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={!newMessage.trim() || !chat}
					>
						<Send className="w-4 h-4" />
					</button>
				</div>
			</form>
		</div>
	);
};

export default Chat;
