import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Disputes from "./pages/Disputes";
import ProtectedRoute from "./components/ProtectedRoute";
import BarterItems from "./pages/BarterItems";
import BarterRequest from "./pages/BarterRequest";
import MyBarterItems from "./pages/MyBarterItems";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import EmptyChat from "./components/EmptyChat";
import AddItem from "./pages/AddItem";
import Forum from "./pages/Forum";
import CreateThread from "./pages/CreateThread";
import ThreadDetails from "./pages/ThreadDetails";
import PageNotFound from "./components/PageNotFound";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />

				<Route path="register" element={<Register />} />
				<Route
					path="dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route path="disputes" element={<Disputes />} />
				<Route path="barter-items" element={<BarterItems />} />
				<Route
					path="barter-request"
					element={
						<ProtectedRoute>
							<BarterRequest />{" "}
						</ProtectedRoute>
					}
				>
					<Route index element={<EmptyChat />} />
					<Route path="chat/:barterRequestId" element={<Chat />} />
				</Route>
				<Route
					path="my-barter-items"
					element={
						<ProtectedRoute>
							<MyBarterItems />
						</ProtectedRoute>
					}
				/>
				<Route path="profile" element={<Profile />} />
				<Route path="add-item" element={<AddItem />} />
				<Route path="chat/:barterRequestId" element={<Chat />} />
				<Route path="forum" element={<Forum />} />
				<Route path="forum/create" element={<CreateThread />} />
				<Route path="forum/thread/:id" element={<ThreadDetails />} />
				<Route path="*" element={<PageNotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
