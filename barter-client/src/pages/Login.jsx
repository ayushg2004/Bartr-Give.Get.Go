import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { BACKEND_URL } from "../constants";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();
	const { toast } = useToast();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${BACKEND_URL}/api/users/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});

			const data = await response.json();
			await login(data);
			if (response.ok) {
				localStorage.setItem("token", data.token);
				toast({
					title: "logged in successfully",
					description: "Redirecting to dashboard...",
				});
				navigate("/dashboard");
			} else {
				toast({
					variant: "destructive",
					title: data.message,
					description: "There was a problem with your request.",
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-semibold text-center">Login</h2>
			<form onSubmit={handleLogin} className="mt-4 space-y-4">
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type="submit" className="w-full">
					Login
				</Button>
			</form>

			<p className="mt-4 text-center">
				Don&apos;t have an account?{" "}
				<Link to="/register" className="text-blue-600 hover:underline">
					Register here
				</Link>
			</p>
		</div>
	);
};

export default Login;
