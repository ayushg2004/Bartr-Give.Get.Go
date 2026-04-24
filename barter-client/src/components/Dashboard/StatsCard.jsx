import { Link } from "react-router-dom";
const StatsCard = ({ title, value, icon, path }) => {
	return (
		
		<Link to = {path} className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
			<span className="text-3xl">{icon}</span>
			<div>
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-gray-500 text-xl">{value}</p>
			</div>
		</Link>
	);
};

export default StatsCard;
