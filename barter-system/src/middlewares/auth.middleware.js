import { User } from "../models/user.model.js";
import JWT from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
	try {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			return res.status(401).json({ message: "Unauthorized: No token provided" });
		}

		const decodedUser = JWT.verify(token, process.env.JWT_SECRET);

		// Support both plain _id (fixed generateToken) and legacy _doc._id
		const userId = decodedUser._id || decodedUser._doc?._id;
		const user = await User.findById(userId).select("-password");

		if (!user) return res.status(401).json({ message: "Invalid token" });
		req.user = user;
		next();
	} catch (error) {
		return res
			.status(401)
			.json({ message: error?.message || "Unauthorized" });
	}
};

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.role === "admin") next();
	else return res.status(403).json({ message: "Admin access required" });
};

export default verifyJWT;
