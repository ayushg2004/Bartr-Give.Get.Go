import { Router } from "express";
import {
	createReview,
	getUserReviews,
} from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.get("/health", (req, res) => {
	const originalUrl = req.originalUrl;
	res.send(`route "${originalUrl}" is healthy.`);
});
reviewRouter.put("/", createReview);
reviewRouter.get("/:userId", getUserReviews);

export default reviewRouter;
