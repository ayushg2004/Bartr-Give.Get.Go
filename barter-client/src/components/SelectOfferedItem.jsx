import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext";
import { BACKEND_URL } from "@/constants";

const SelectOfferedItem = ({ offeredItemId, setOfferedItemId }) => {
    const {user} = useAuth();
    const [items, setItems] = useState([]);

    const getOurItems = async () => {
        const response = await fetch(`${BACKEND_URL}/api/barter-items/user/${user._id}`, {
          method: "GET",
          credentials: "include", 
        });
        const data = await response.json();
        console.log(data);
        setItems(data.data);
    }
    
    useEffect(() => {
        getOurItems();
    }, [offeredItemId])

    return (
        <div>
      <select
        className="w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={offeredItemId}
        onChange={(e) => setOfferedItemId(e.target.value)}
      >
        <option value="">Select a title</option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title}
          </option>
        ))}
      </select>
      {/* {selectedId && <p className="mt-2 text-sm text-gray-600">Selected ID: {selectedId}</p>} */}
    </div>
    )
}

export default SelectOfferedItem;