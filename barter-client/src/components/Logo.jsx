import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="flex items-center cursor-pointer">
            <Link to="/" className="flex items-center gap-2 cursor-pointer text-purple-600">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold">BarterHive</span>
            </Link>
          </div>
    );
};

export default Logo;
