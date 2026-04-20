"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
}

export function RatingStars({ rating, maxRating = 10, size = "md" }: RatingStarsProps) {
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size];

  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;

  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div key={`star-${i}`} className="relative">
          <Star
            className={`${sizeClass} text-gray-300`}
            fill="currentColor"
          />
          {i < fullStars && (
            <Star
              className={`${sizeClass} text-yellow-400 absolute top-0 left-0`}
              fill="currentColor"
            />
          )}
          {i === fullStars && hasHalfStar && (
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star
                className={`${sizeClass} text-yellow-400`}
                fill="currentColor"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
