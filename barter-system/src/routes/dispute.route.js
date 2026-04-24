import { Router } from "express";
import {
	createDispute,
	getDisputes,
	resolveDispute,
} from "../controllers/dispute.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const disputeRouter = Router();

disputeRouter.post("/", createDispute);
disputeRouter.get("/", isAdmin, getDisputes);
disputeRouter.put("/:disputeId", isAdmin, resolveDispute);

export default disputeRouter;
