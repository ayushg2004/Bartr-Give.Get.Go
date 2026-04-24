const RecentActivities = ({ activities }) => {
	return (
		<div className="bg-white p-4 shadow rounded-lg">
			<h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
			<ul className="text-sm text-gray-600">
				{activities.map((activity, index) => (
					<li key={index} className="border-b p-2">
						{activity}
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecentActivities;
