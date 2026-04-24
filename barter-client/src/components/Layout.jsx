import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "./ui/toaster";
import Footer from "./Footer";

const Layout = () => {
	return (
		<div className="w-full min-h-screen bg-background">
			<Navbar />
			<main className="">
				<Outlet />
			</main>
			<Toaster />
			<Footer />
		</div>
	);
};

export default Layout;
