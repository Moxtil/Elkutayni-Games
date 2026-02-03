import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating = 0.0, max = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex w-full max-w-xs gap-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar
          key={`full-${i}`}
          size={15}
          className="flex-1 w-full h-auto max-w-[15px]"
        />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt
          key="half"
          size={15}
          className="flex-1 w-full h-auto max-w-[15px]"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar
          key={`empty-${i}`}
          size={15}
          className="flex-1 w-full h-auto max-w-[15px]"
        />
      ))}
    </div>
  );
};

export default RatingStars;
