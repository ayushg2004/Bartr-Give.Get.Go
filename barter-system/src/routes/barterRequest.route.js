import { Router } from "express";
import {
	createBarterRequest,
	getUserBarterRequest,
	markAsCompleted,
	updateBarterRequestStatus,
} from "../controllers/barterRequest.controller.js";

const barterRequestRouter = Router();

barterRequestRouter.get("/health", (req, res) => {
	const originalRoute = req.originalUrl;
	return res.send(`route "${originalRoute}" is healthy `);
});

barterRequestRouter.post("/", createBarterRequest);

barterRequestRouter.get("/user/:userId", getUserBarterRequest);

barterRequestRouter.put("/:id/status", updateBarterRequestStatus);

barterRequestRouter.put("/:barterRequestId", markAsCompleted);

export default barterRequestRouter;
