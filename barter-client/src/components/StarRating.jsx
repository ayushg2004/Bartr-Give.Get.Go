import { useState } from "react";
import { Star } from "lucide-react"; // Assuming you're using Lucide icons for stars

const StarRating = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
  size = "md",
  disabled = false,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating) => {
    if (!disabled) {
      setRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating);
      }
    }
  };

  const handleMouseEnter = (newHoverRating) => {
    if (!disabled) {
      setHoverRating(newHoverRating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4";
      case "md":
        return "h-6 w-6";
      case "lg":
        return "h-8 w-8";
      default:
        return "h-6 w-6";
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);
        return (
          <button
            key={index}
            type="button"
            className={`p-1 focus:outline-none ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
          >
            <Star
              className={`${getSizeClasses()} ${
                isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              } transition-colors duration-200`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;