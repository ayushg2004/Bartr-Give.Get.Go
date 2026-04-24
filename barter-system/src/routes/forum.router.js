import { Router } from "express";
import { createThread, getAllThreads, createComment, getCommentsByThread } from "../controllers/forum.controller.js";
const router = Router();
router.post("/threads", createThread);
router.get("/threads", getAllThreads);
router.post("/comments", createComment);
router.get("/comments/:threadId", getCommentsByThread);

export default router;