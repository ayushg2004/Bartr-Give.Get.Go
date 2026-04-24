"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Menu,
	X,
	User,
	Package,
	LayoutDashboard,
	LogOut,
	PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { BACKEND_URL } from "@/constants";
import AddBarterItemDialog from "./BarterItem/AddBarterItem";
import Logo from "./Logo";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const { logout, user } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await fetch(`${BACKEND_URL}/api/users/logout`, {
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			await logout();
			toast({
				description: "Successfully logged out",
			});
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<nav className="sticky top-0 z-50 border-b bg-background">
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo and Brand */}
					<Logo />

					{/* Desktop Navigation */}
					<div className="hidden md:block">
						<div className="flex items-center space-x-4">
							<Button
								asChild
								variant="default"
								className="bg-purple-600 hover:bg-purple-700"
							>
								<Link to="/dashboard">
									<LayoutDashboard className="w-4 h-4 mr-2" />
									Dashboard
								</Link>
							</Button>

							{user && <AddBarterItemDialog />}

							<Button
								asChild
								variant="ghost"
								className="text-foreground/70 hover:text-foreground hover:bg-accent"
							>
								<Link to="/barter-items">
									<Package className="w-4 h-4 mr-2" />
									Browse Items
								</Link>
							</Button>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										className="border-purple-200 rounded-full hover:border-purple-300 hover:bg-purple-50"
									>
										<User className="w-5 h-5 text-purple-700" />
										<span className="sr-only">User menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56">
									<DropdownMenuItem asChild>
										<Link to="/profile" className="flex items-center">
											<User className="w-4 h-4 mr-2" />
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link to="/my-items" className="flex items-center">
											<Package className="w-4 h-4 mr-2" />
											My Items
										</Link>
									</DropdownMenuItem>
									{user ? (
										<DropdownMenuItem
											onClick={handleLogout}
											className="text-red-600 hover:text-red-700 focus:text-red-700"
										>
											<LogOut className="w-4 h-4 mr-2" />
											Logout
										</DropdownMenuItem>
									) : (
										<DropdownMenuItem asChild>
											<Link to="/login" className="flex items-center">
												<LogOut className="w-4 h-4 mr-2" />
												Login
											</Link>
										</DropdownMenuItem>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
							className="text-foreground"
						>
							{isOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden">
					<div className="px-4 pt-2 pb-3 space-y-1 rounded-b-lg shadow-lg bg-background">
						<Link
							to="/dashboard"
							className="flex items-center px-3 py-2 text-base rounded-md hover:bg-accent"
							onClick={() => setIsOpen(false)}
						>
							<LayoutDashboard className="w-5 h-5 mr-2 text-purple-600" />
							Dashboard
						</Link>

						<Link
							to="/barter-items"
							className="flex items-center px-3 py-2 text-base rounded-md hover:bg-accent"
							onClick={() => setIsOpen(false)}
						>
							<Package className="w-5 h-5 mr-2 text-purple-600" />
							Browse Items
						</Link>

						<Link
							to="/profile"
							className="flex items-center px-3 py-2 text-base rounded-md hover:bg-accent"
							onClick={() => setIsOpen(false)}
						>
							<User className="w-5 h-5 mr-2 text-purple-600" />
							Profile
						</Link>

						<Link
							to="/my-items"
							className="flex items-center px-3 py-2 text-base rounded-md hover:bg-accent"
							onClick={() => setIsOpen(false)}
						>
							<Package className="w-5 h-5 mr-2 text-purple-600" />
							My Items
						</Link>

						<div className="pt-2 mt-2 border-t border-border">
							{user ? (
								<Button
									onClick={() => {
										handleLogout();
										setIsOpen(false);
									}}
									variant="ghost"
									className="justify-start w-full px-3 text-base font-normal text-red-600 hover:text-red-700 hover:bg-red-50"
								>
									<LogOut className="w-5 h-5 mr-2" />
									Logout
								</Button>
							) : (
								<Link
									to="/login"
									className="flex items-center px-3 py-2 text-base rounded-md hover:bg-accent"
									onClick={() => setIsOpen(false)}
								>
									<LogOut className="w-5 h-5 mr-2 text-purple-600" />
									Login
								</Link>
							)}
						</div>

						<div className="pt-2 mt-2 border-t border-border">
							<Button
								asChild
								variant="default"
								className="w-full bg-purple-600 hover:bg-purple-700"
								onClick={() => setIsOpen(false)}
							>
								<Link
									to="/add-item"
									className="flex items-center justify-center"
								>
									<PlusCircle className="w-5 h-5 mr-2" />
									Add New Item
								</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
