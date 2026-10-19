import { Star } from "lucide-react";

type RatingProps = {
  value: number;
};

export default function Rating({ value }: RatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const index = i + 1;

        return (
          <Star
            key={i}
            size={18}
            className={
              index <= Math.round(value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-yellow-400"
            }
          />
        );
      })}
    </div>
  );
}
