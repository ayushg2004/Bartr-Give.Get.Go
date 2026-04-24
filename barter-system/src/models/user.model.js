import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["user", "admin"], default: "user" },
		location: { type: String, required: true },
		reputation: { type: Number, default: 5 },
		offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "BarterItem" }],
		requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "BarterRequest" }],
	},
	{ timestamps: true }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Compare hashed passwords
userSchema.methods.isCorrectPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
