import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
	return (
		<aside className="w-64 h-screen p-4 shadow-lg">
  <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
  <ul className="space-y-2">
    <li className="w-full">
      <Link to="/my-barter-items" className="w-full block">
        <Button variant="ghost" className="w-full justify-start">My Barter Items</Button>
      </Link>
    </li>
    <li className="w-full">
      <Link to="/barter-items" className="w-full block">
        <Button variant="ghost" className="w-full justify-start">Explore Barter Items</Button>
      </Link>
    </li>
    <li className="w-full">
      <Link to="/barter-request" className="w-full block">
        <Button variant="ghost" className="w-full justify-start">My Requests</Button>
      </Link>
    </li>
    <li className="w-full">
      <Link to="/profile" className="w-full block">
        <Button variant="ghost" className="w-full justify-start">Profile</Button>
      </Link>
    </li>

    <li className="w-full">
      <Link to = "/forum" className="w-full block">
        <Button variant="ghost" className="w-full justify-start">Community Forum</Button>
      </Link>
    </li>
  </ul>
</aside>


	);
};

export default Sidebar;
