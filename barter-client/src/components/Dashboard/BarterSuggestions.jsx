const BarterSuggestions = ({ items }) => {
	return (
		<div className="bg-white p-4 shadow rounded-lg">
			<h3 className="text-lg font-semibold mb-2">Suggested Barters</h3>
			<ul className="text-sm">
				{items.map((item, index) => (
					<li key={index} className="border-b p-2 flex justify-between">
						<span>{item.name}</span>
						<button className="text-blue-500">View</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default BarterSuggestions;
