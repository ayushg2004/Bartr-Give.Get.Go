import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowDown,
	ArrowRight,
	BarChart2,
	Gift,
	MessageCircle,
	ShoppingBag,
	Star,
	Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { LANDING_PAGE_VIDEO } from "@/constants";
export default function LandingPage() {
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current
				.play()
				.catch((err) => console.error("Autoplay failed:", err));
		}
	}, []);
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section with Video Background */}
			<section className="relative overflow-hidden">
				{/* Video Background */}
				<div className="absolute inset-0 w-full h-full overflow-hidden">
					<video
						ref={videoRef}
						autoPlay
						loop
						muted
						playsInline
						className="absolute inset-0 object-cover min-w-full min-h-full"
					>
						<source src={LANDING_PAGE_VIDEO} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
					<div className="absolute inset-0 bg-black opacity-60" />
				</div>

				<div className="container relative z-10 mx-auto flex min-h-[85vh] flex-col items-center justify-center px-4 py-32 text-center md:px-8 lg:py-36">
					<Badge className="mb-4 text-white bg-white/20 hover:bg-white/20">
						Community Barter Platform
					</Badge>
					<h1 className="max-w-4xl mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
						Trade Smarter, <span className="text-amber-300">Live Better</span>
					</h1>
					<p className="max-w-2xl mb-8 text-lg text-white/90 md:text-xl">
						Swap your unused goods & services for what you need—no money
						required! Join our community of traders and discover the power of
						bartering.
					</p>
					<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
						<Link to={"/register"}>
							<Button
								size="lg"
								className="text-purple-700 bg-white hover:bg-white/90"
							>
								Get Started
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</Link>
						<Link>
							<Button
								size="lg"
								variant="outline"
								className="text-white border-white hover:bg-amber-300/90 bg-amber-300 hover:text-white"
							>
								How It Works
								<ArrowDown className="w-4 h-4 ml-2" />
							</Button>
						</Link>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/35 to-transparent" />
			</section>

			{/* Stats Section */}
			<section className="container px-4 mx-auto mt-8 md:px-6">
				<div className="grid grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-xl sm:grid-cols-4 md:p-8">
					{[
						{ value: "10K+", label: "Active Users", icon: Users },
						{ value: "50K+", label: "Trades Completed", icon: ShoppingBag },
						{ value: "100+", label: "Categories", icon: BarChart2 },
						{ value: "4.9", label: "User Rating", icon: Star },
					].map((stat, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center p-4 text-center"
						>
							<stat.icon className="w-6 h-6 mb-2 text-purple-600" />
							<h3 className="text-2xl font-bold sm:text-3xl">{stat.value}</h3>
							<p className="text-sm text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</div>
			</section>

			{/* How It Works */}
			<section className="container px-4 py-20 mx-auto md:px-6">
				<div className="mb-12 text-center">
					<Badge className="mb-2">Simple Process</Badge>
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						How It Works
					</h2>
					<p className="mt-4 text-muted-foreground">
						Three simple steps to start bartering in our community
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					{[
						{
							title: "List Your Items",
							description:
								"Post items or services you want to barter with detailed descriptions and photos.",
							icon: Gift,
							color: "bg-rose-100 text-rose-700",
						},
						{
							title: "Find a Match",
							description:
								"Browse listings & find the perfect trade. Filter by category, location, or value.",
							icon: ShoppingBag,
							color: "bg-amber-100 text-amber-700",
						},
						{
							title: "Make a Deal",
							description:
								"Chat, negotiate, and finalize the swap! Meet up safely or arrange shipping.",
							icon: MessageCircle,
							color: "bg-purple-100 text-purple-700",
						},
					].map((step, index) => (
						<Card key={index} className="overflow-hidden border-none shadow-md">
							<CardHeader className="pb-2">
								<div
									className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${step.color}`}
								>
									<step.icon className="w-6 h-6" />
								</div>
								<CardTitle className="text-2xl">{step.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									{step.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Popular Categories */}
			<section className="py-20 bg-muted">
				<div className="container px-4 mx-auto md:px-6">
					<div className="mb-12 text-center">
						<Badge className="mb-2">Explore</Badge>
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
							Popular Categories
						</h2>
						<p className="mt-4 text-muted-foreground">
							Discover the most traded items and services in our community
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
						{[
							{
								name: "Electronics",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/popular+categories/electronics.jpg",
							},
							{
								name: "Clothing",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/popular+categories/clothing.jpg",
							},
							{
								name: "Furniture",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/popular+categories/furniture.avif",
							},
							{
								name: "Books",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/popular+categories/books.jpg",
							},
							{
								name: "Services",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/popular+categories/services.jpg",
							},
							{
								name: "Collectibles",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/popular+categories/collectibles.jpg",
							},
						].map((category, index) => (
							<Link
								to="#"
								key={index}
								className="overflow-hidden transition-all bg-white rounded-lg shadow-md group hover:shadow-lg"
							>
								<div className="overflow-hidden aspect-square">
									<img
										src={category.image || "/placeholder.svg"}
										alt={category.name}
										className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
									/>
								</div>
								<div className="p-3 text-center">
									<h3 className="font-medium">{category.name}</h3>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="container px-4 py-20 mx-auto md:px-6">
				<div className="mb-12 text-center">
					<Badge className="mb-2">Testimonials</Badge>
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						What Our Users Say
					</h2>
					<p className="mt-4 text-muted-foreground">
						Real stories from our community members
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{[
						{
							name: "John Doe",
							location: "New York, NY",
							feedback:
								"Amazing platform! I traded my old bike for a laptop that I desperately needed for my studies. The process was smooth and the community is very friendly.",
							image:
								"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/users/john.jpg",
						},
						{
							name: "Jane Smith",
							location: "Austin, TX",
							feedback:
								"I've been using this platform for 6 months and have completed over 20 trades! Found great deals and met wonderful people here. It's changed how I think about consumption.",
							image:
								"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/users/jane+smith.jpg",
						},
						{
							name: "Alex Johnson",
							location: "Seattle, WA",
							feedback:
								"As someone who values sustainability, this platform has been a game-changer. I've furnished my entire apartment through trades and saved thousands of dollars.",
							image:
								"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/users/alex+johnson.jpg",
						},
					].map((testimonial, index) => (
						<Card key={index} className="overflow-hidden border-none shadow-md">
							<CardContent className="p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="w-12 h-12 overflow-hidden rounded-full">
										<img
											src={testimonial.image || "/placeholder.svg"}
											alt={testimonial.name}
											className="object-cover w-full h-full"
										/>
									</div>
									<div>
										<h4 className="font-semibold">{testimonial.name}</h4>
										<p className="text-sm text-muted-foreground">
											{testimonial.location}
										</p>
									</div>
								</div>
								<p className="italic text-muted-foreground">{`"${testimonial.feedback}"`}</p>
								<div className="flex mt-4 text-amber-500">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className="w-4 h-4 fill-current" />
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Featured Trades */}
			<section className="py-20 bg-muted">
				<div className="container px-4 mx-auto md:px-6">
					<div className="mb-12 text-center">
						<Badge className="mb-2">Success Stories</Badge>
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
							Featured Trades
						</h2>
						<p className="mt-4 text-muted-foreground">
							Check out some of our most interesting recent trades
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								title: "Guitar for Photography Session",
								description:
									"Michael traded his vintage guitar for a professional photoshoot for his wedding.",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/trades/guitar_photography.webp",
							},
							{
								title: "Cooking Lessons for Website Design",
								description:
									"Chef Maria exchanged 5 cooking lessons for a complete website redesign.",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/trades/webdesing_cooking.webp",
							},
							{
								title: "Furniture for Gardening Services",
								description:
									"Tom swapped his handcrafted coffee table for a complete garden makeover.",
								image:
									"https://barter-hive.s3.us-east-1.amazonaws.com/images+for+home+page/trades/gardening_furniture.webp",
							},
						].map((trade, index) => (
							<Card
								key={index}
								className="overflow-hidden border-none shadow-md"
							>
								<div className="overflow-hidden aspect-video">
									<img
										src={trade.image || "/placeholder.svg"}
										alt={trade.title}
										className="object-cover w-full h-full"
									/>
								</div>
								<CardHeader>
									<CardTitle>{trade.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base">
										{trade.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative py-20 overflow-hidden text-white bg-gradient-to-r from-rose-500 to-purple-600">
				<div className="container relative z-10 px-4 mx-auto text-center md:px-6">
					<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Start Bartering Today!
					</h2>
					<p className="max-w-2xl mx-auto mb-8 text-lg text-white/90">
						Join thousands of users swapping goods & services effortlessly. No
						money needed, just bring your items and skills!
					</p>
					<div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
						<Link to="/register">
							<Button
								size="lg"
								className="text-purple-700 bg-white hover:bg-white/90"
							>
								Create Account
							</Button>
						</Link>

						<Link to="/barter-items">
							<Button
								size="lg"
								variant="outline"
								className="text-white border-white bg-violet-500 hover:bg-violet-500 hover:text-white"
							>
								Browse Listings
							</Button>
						</Link>
					</div>
				</div>
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)]" />
				</div>
			</section>
		</div>
	);
}
