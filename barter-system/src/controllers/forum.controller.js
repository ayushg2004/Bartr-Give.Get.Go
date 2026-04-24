import { Thread } from "../models/Thread.js";
import { Comment } from "../models/Comment.js";

// Create a discussion thread
export const createThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id; // Get user from auth middleware

    const thread = new Thread({ title, content, user: userId });
    await thread.save();

    res.status(201).json(thread);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all discussion threads
export const getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.find().populate("user", "name");
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a comment to a thread
export const createComment = async (req, res) => {
  try {
    const { threadId, content } = req.body;
    const userId = req.user._id;

    const comment = new Comment({ thread: threadId, user: userId, content });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch comments for a thread
export const getCommentsByThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const comments = await Comment.find({ thread: threadId }).populate("user", "name");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
