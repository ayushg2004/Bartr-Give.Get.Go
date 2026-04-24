"use client";

import { useState } from "react";
import { User, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ProfilePicture = () => {
	const [image, setImage] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const { toast } = useToast();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 2 * 1024 * 1024) {
				toast({
					title: "File too large",
					description: "Image must be less than 2MB",
					variant: "destructive",
				});
				return;
			}

			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
				toast({
					title: "Success",
					description: "Profile picture uploaded successfully",
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setIsDragging(true);
		} else if (e.type === "dragleave") {
			setIsDragging(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) {
			if (file.size > 2 * 1024 * 1024) {
				toast({
					title: "File too large",
					description: "Image must be less than 2MB",
					variant: "destructive",
				});
				return;
			}

			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
				toast({
					title: "Success",
					description: "Profile picture uploaded successfully",
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		setImage(null);
		toast({
			title: "Removed",
			description: "Profile picture has been removed",
		});
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardContent className="p-6">
				<div className="flex flex-col items-center gap-6">
					{image ? (
						<div className="relative">
							<img
								src={image}
								alt="Profile"
								className="object-cover w-32 h-32 border-2 border-gray-200 rounded-full"
							/>
							<button
								onClick={removeImage}
								className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
							>
								<X size={16} />
							</button>
						</div>
					) : (
						<div className="flex items-center justify-center w-32 h-32 text-gray-400 bg-gray-100 border-2 border-gray-200 border-dashed rounded-full">
							<User size={48} />
						</div>
					)}

					<div
						className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center ${
							isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
						}`}
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag}
						onDrop={handleDrop}
					>
						<Upload className="w-10 h-10 mb-2 text-gray-400" />
						<div className="flex flex-col items-center justify-center text-center">
							<Button
								variant="secondary"
								className="relative mb-2"
								onClick={() =>
									document.getElementById("profile-upload").click()
								}
							>
								Upload Photo
								<input
									id="profile-upload"
									type="file"
									className="hidden"
									accept="image/jpeg,image/png,image/gif"
									onChange={handleImageChange}
								/>
							</Button>
							<p className="text-sm text-gray-500">
								Drag and drop or click to upload
							</p>
							<p className="mt-1 text-xs text-gray-400">
								JPG, PNG or GIF (max. 2MB)
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfilePicture;
