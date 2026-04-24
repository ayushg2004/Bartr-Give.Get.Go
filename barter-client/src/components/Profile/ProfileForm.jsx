"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationSelector from "./LocationSelector";
import { BACKEND_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const ProfileForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		location: "",
	});
	const { toast } = useToast();

	// Load user data on component mount
	useEffect(() => {
		const loadUserData = () => {
			try {
				const userData = localStorage.getItem("user");
				if (userData) {
					const parsedUser = JSON.parse(userData);
					setFormData({
						name: parsedUser.name || "",
						email: parsedUser.email || "",
						location: parsedUser.location || "",
					});
				}
			} catch (error) {
				console.error("Error loading user data:", error);
				toast({
					description: "Could not load user profile data",
					variant: "destructive",
				});
			}
		};

		loadUserData();
	}, [toast]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const response = await fetch(`${BACKEND_URL}/api/users/update-profile`, {
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (!response.ok) {
				toast({
					description: result.message || "Failed to update profile",
					variant: "destructive",
				});
				throw new Error(result.message || "Failed to update profile");
			}

			const updatedUser = {
				name: formData.name,
				email: formData.email,
				location: formData.location,
			};
			localStorage.setItem("user", JSON.stringify(updatedUser));

			toast({
				description: "Profile updated successfully!",
			});
		} catch (error) {
			console.error("Error updating profile:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Full Name</Label>
					<Input
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter your full name"
						disabled={isLoading}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="email">Email Address</Label>
					<Input
						id="email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Enter your email"
						disabled={isLoading}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="location">Location</Label>
					<LocationSelector
						value={formData.location}
						onChange={handleChange}
						disabled={isLoading}
					/>
				</div>
			</div>

			<Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
				{isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
				{isLoading ? "Saving Changes..." : "Save Changes"}
			</Button>
		</form>
	);
};

export default ProfileForm;
