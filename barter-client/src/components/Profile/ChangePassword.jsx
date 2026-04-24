"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock } from "lucide-react";

const ChangePassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [passwordData, setPasswordData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const { toast } = useToast();

	const handleChange = (e) => {
		setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate passwords match
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			toast({
				description: "New passwords do not match!",
				variant: "destructive",
			});
			return;
		}

		// Validate password length
		if (passwordData.newPassword.length < 6) {
			toast({
				description: "New password must be at least 6 characters long",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/api/users/update-password`, {
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					oldPassword: passwordData.oldPassword,
					newPassword: passwordData.newPassword,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				toast({
					description: result.message || "Failed to update password",
					variant: "destructive",
				});
				throw new Error(result.message || "Failed to update password");
			}

			// Reset form after successful update
			setPasswordData({
				oldPassword: "",
				newPassword: "",
				confirmPassword: "",
			});

			toast({
				description: "Password updated successfully!",
			});
		} catch (error) {
			console.error("Error updating password:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader className="space-y-1">
				<CardTitle className="flex items-center gap-2 text-2xl">
					<Lock className="w-5 h-5" />
					Change Password
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="oldPassword">Current Password</Label>
						<Input
							id="oldPassword"
							type="password"
							name="oldPassword"
							value={passwordData.oldPassword}
							onChange={handleChange}
							required
							disabled={isLoading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="newPassword">New Password</Label>
						<Input
							id="newPassword"
							type="password"
							name="newPassword"
							value={passwordData.newPassword}
							onChange={handleChange}
							required
							disabled={isLoading}
							placeholder="At least 6 characters"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm New Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							name="confirmPassword"
							value={passwordData.confirmPassword}
							onChange={handleChange}
							required
							disabled={isLoading}
						/>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
						{isLoading ? "Updating Password..." : "Update Password"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default ChangePassword;
