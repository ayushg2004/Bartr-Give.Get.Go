import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/constants";
import BarterItem from "@/components/BarterItem/BarterItem";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const BarterItems = () => {
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const getAllItems = async () => {
		setIsLoading(true);
		try {
		  const data = await fetch(`${BACKEND_URL}/api/barter-items`, {
			method: "GET",
			credentials: "include",
		  });
		  const items = await data.json();
		  setItems(items.data);
		  setFilteredItems(items.data);
		} catch (error) {
		  console.error("Error fetching barter items:", error);
		} finally {
		  setIsLoading(false);
		}
	  };
	useEffect(() => {
		getAllItems();
	}, []);

	useEffect(() => {
		if (searchQuery.trim() === "") {
		  setFilteredItems(items);
		} else {
		  const filtered = items.filter((item) =>
			item.title.toLowerCase().includes(searchQuery.toLowerCase())
		  );
		  setFilteredItems(filtered);
		}
	  }, [searchQuery, items]);
	
	  // Handle search input change
	  const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	  };

	 return (
    <div className="container mx-auto p-6">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Available Barter Items
      </h1>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by item name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        {filteredItems.length !== items.length && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {filteredItems.length} of {items.length} items
          </p>
        )}
      </div>

      {/* Grid Layout for Items */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <BarterItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No items found matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default BarterItems;
