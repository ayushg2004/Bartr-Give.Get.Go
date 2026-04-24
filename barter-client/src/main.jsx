import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProvider>
			<StrictMode>
				<Toaster />
				<App />
			</StrictMode>
		</AuthProvider>
	</BrowserRouter>
);
