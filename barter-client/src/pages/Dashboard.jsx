import { useState, useEffect } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import StatsCard from "@/components/Dashboard/StatsCard";
import RecentActivities from "@/components/Dashboard/RecentActivities";
import BarterSuggestions from "@/components/Dashboard/BarterSuggestions";
import Notifications from "@/components/Dashboard/Notifications";
import WelcomeSection from "@/components/Dashboard/WelcomeSection";

import { useAuth } from "@/context/AuthContext";
import ThreadList from "@/components/CommunityForum/ThreadList";
import { BACKEND_URL } from "@/constants";

const Dashboard = () => {
	const { user } = useAuth();
	const [threads, setThreads] = useState([]);
  	const [isLoadingThreads, setIsLoadingThreads] = useState(true);
	  useEffect(() => {
		async function fetchData() {
		  try {
			const response = await fetch(`${BACKEND_URL}/api/forum/threads/`, {
			  method: "GET",
			  headers: { "Content-Type": "application/json" },
			  credentials: "include",
			})
	
			if (!response.ok) throw new Error("Failed to fetch threads")
	
			const data = await response.json()
			setThreads(data)
		  } catch (error) {
			console.error("Error fetching threads:", error)
			
		  } finally {
			setIsLoadingThreads(false)
		  }
		}
	
		fetchData()
	  }, [])
	

	return (
		<div className="flex">
			<Sidebar />
			<main className="flex-1 p-6 bg-gray-50">
			
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-semibold">Dashboard</h2>
					
					<Notifications notifications={["New trade request!", "Message from Bob."]} />
				</div>
				<div>
				<WelcomeSection user={user} />
				</div>
				<div className="grid grid-cols-3 gap-4 mt-4">
					<StatsCard title="Pending Requests" value={5} icon="📩" path="/barter-request" />
					<StatsCard title="Successful Trades" value={12} icon="✅" path= "/my-barter-items"/>
					<StatsCard title="Items Listed" value={8} icon="📦" path = "/my-barter-items"/>
				</div>

				<div className="grid grid-cols-2 gap-4 mt-6">
					<RecentActivities activities={[
						"John accepted your barter request.",
						"New barter item added: 'Wireless Headphones'."
					]} />
					<BarterSuggestions items={[
						{ name: "Laptop Stand" },
						{ name: "Fitness Tracker" }
					]} />
				</div>

				 {/* New ThreadList Section */}
				<div className="mt-6">
          		<h3 className="text-xl font-medium mb-4">Recent Community Forums</h3>
          		<ThreadList threads={threads} isLoading={isLoadingThreads} />
        </div>
			</main>
		</div>
	);
};

export default Dashboard;
