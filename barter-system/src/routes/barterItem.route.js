import { Router } from "express";
import {
	createBarterItem,
	getAllBarterItems,
	getUserBarterItems,
	updateBarterItemStatus,
} from "../controllers/barterItem.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const barterItemRouter = Router();

barterItemRouter.get("/health", (req, res) => {
	const originalRoute = req.originalUrl;
	return res.send(`route "${originalRoute}" is healthy `);
});
barterItemRouter.post("/", verifyJWT, createBarterItem);
barterItemRouter.get("/", getAllBarterItems);
barterItemRouter.get("/user/:userId", verifyJWT, getUserBarterItems);
barterItemRouter.put("/:id/status", verifyJWT, updateBarterItemStatus);


export default barterItemRouter;
