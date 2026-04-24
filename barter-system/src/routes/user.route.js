import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
	getUserProfile,
	loginUser,
	logoutUser,
	registerUer,
	updatePassword,
	updateProfile
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/health", (req, res) => {
	const originalRoute = req.originalUrl;
	return res.send(`route "${originalRoute}" is healthy `);
});
userRouter.post("/register", registerUer);
userRouter.post("/login", loginUser);
userRouter.get("/profile", verifyJWT, getUserProfile);
userRouter.put("/logout", verifyJWT, logoutUser);
userRouter.put("/update-profile", verifyJWT, updateProfile);
userRouter.put("/update-password", verifyJWT, updatePassword);
export default userRouter;
