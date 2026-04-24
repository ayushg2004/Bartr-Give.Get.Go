import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="py-12 text-gray-300 bg-gray-900">
			<div className="container px-4 mx-auto md:px-6">
				<div className="grid gap-8 md:grid-cols-4">
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">
							Community Barter
						</h3>
						<p className="text-sm">
							The modern way to trade goods and services without using money.
							Join our community today!
						</p>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-semibold text-gray-400 uppercase">
							Quick Links
						</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/dashboard" className="hover:text-white">
									Home
								</Link>
							</li>
							<li>
								<Link className="hover:text-white">How It Works</Link>
							</li>
							<li>
								<Link to="/barter-items" className="hover:text-white">
									Browse Listings
								</Link>
							</li>
							<li>
								<Link className="hover:text-white">Success Stories</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-semibold text-gray-400 uppercase">
							Resources
						</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link className="hover:text-white">Safety Tips</Link>
							</li>
							<li>
								<Link className="hover:text-white">Trading Guide</Link>
							</li>
							<li>
								<Link className="hover:text-white">FAQ</Link>
							</li>
							<li>
								<Link className="hover:text-white">Contact Support</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-semibold text-gray-400 uppercase">
							Legal
						</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link className="hover:text-white">Terms of Service</Link>
							</li>
							<li>
								<Link className="hover:text-white">Privacy Policy</Link>
							</li>
							<li>
								<Link className="hover:text-white">Cookie Policy</Link>
							</li>
							<li>
								<Link className="hover:text-white">Community Guidelines</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="pt-8 mt-12 text-sm text-center border-t border-gray-800">
					<p>
						&copy; {new Date().getFullYear()} Community Barter System. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
