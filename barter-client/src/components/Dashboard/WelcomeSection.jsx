import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeSection = ({ user }) => {
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) setGreeting("Good Morning");
		else if (hour < 18) setGreeting("Good Afternoon");
		else setGreeting("Good Evening");
	}, []);

	return (
		<div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
			{/* Profile Picture */}
            <User className="w-10 h-10 text-gray-700" />

			{/* Text Content */}
			<div>
				<h2 className="text-2xl font-semibold">{greeting}, {user?.name}!</h2>
				<p className="text-gray-600">"Trade Smart, Save More!"</p>
			</div>

			{/* Edit Profile Button */}
            
            <Link to="/profile" className="ml-auto">
			<Button className="ml-auto">
				Edit Profile
			</Button>
            </Link>
		</div>
	);
};

export default WelcomeSection;
