import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
// Generate JWT Token
const generateToken = (user) => {
	return jwt.sign(
		{ _id: user._id, email: user.email, role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: "30d" }
	);
};

export const registerUer = async (req, res) => {
	const { name, email, password, location } = req.body;

	try {
		// validate the req field
		if (!name || !email || !password || !location) {
			return res
				.status(402)
				.json({ message: "Please provide all the required field" });
		}

		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists)
			return res.status(400).json({ message: "User already exists" });

		// Create new user
		const user = await User.create({ name, email, password, location });
		if (user) {
			res.status(201).json({
				message: "User created successfully",
				data: { _id: user.id, name, email, location },
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password)
			return res
				.status(402)
				.json({ message: "email and password both required for login" });

		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(404)
				.json({ message: "user not register, please register first" });

		const isCorrectPassword = await user.isCorrectPassword(password);

		if (!isCorrectPassword)
			return res
				.status(401)
				.json({ message: "Invalid email or password or not matched" });

		const accessToken = generateToken(user);

		const options = {
			httpOnly: true,
			secure: false,
			sameSite: "lax", // Prevents CSRF attacks
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
		};

		return res.status(200).cookie("accessToken", accessToken, options).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: accessToken,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const logoutUser = async (req, res) => {
	const options = {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
	};

	//delete cookies from frontend
	return res
		.status(200)
		.clearCookie("accessToken", options)
		.json({ message: "User logged out successfully" });
};

export const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const updateProfile = async (req, res) => {
	try {
		const { name, email, location } = req.body;
		const userId = req.user._id;

		// Find and update user details
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ name, email, location },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const accessToken = generateToken(updatedUser);
		const options = {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		}
		res.status(200).cookie("accessToken",accessToken,options).json({  
			_id : updatedUser.id,
			name : updatedUser.name,
			email : updatedUser.email,
			token : accessToken
			 });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const updatePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		const userId = req.user._id;

		// Find user by ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Check if old password matches
		const isCorrectPassword = await user.isCorrectPassword(oldPassword);
		if (!isCorrectPassword) {
			return res.status(400).json({ message: "Incorrect old password" });
		}

		const accessToken = generateToken(user);
		const options = {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		}


		// Update password
		user.password = newPassword;
		await user.save();

		res.status(200).cookie("accessToken",accessToken,options).json({ 
			_id : user.id,
			name : user.name,
			email : user.email,
			token : accessToken
		 });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};