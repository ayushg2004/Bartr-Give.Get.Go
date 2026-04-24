import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Simulated login function (replace with real API call)
	const login = async (userData) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData)); // Store user in local storage
	};

	// Logout function
	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	// Check if user is logged in on component mount
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// Custom hook to use the auth context
