import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PageNotFound() {
	return (
		<div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
			<div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
				<div className="p-3 mb-4 rounded-full bg-muted">
					<AlertCircle className="w-10 h-10 text-muted-foreground" />
				</div>
				<h1 className="mb-2 text-4xl font-bold">Page not found</h1>
				<p className="mb-8 text-muted-foreground">
					Sorry, we couldn&apos;t find the page you&apos;re looking for. The
					page might have been removed or the URL might be incorrect.
				</p>
				<Button asChild>
					<Link to="/">Return to home</Link>
				</Button>
			</div>
		</div>
	);
}
