import { Rating, RatingButton } from "@/shared/ui/kit/rating";
import { Sparkles } from "lucide-react";

export function PrioritySelect({
  priority,
  setPriority,
}: {
  priority: number;
  setPriority: (value: number) => void;
}) {
  const descriptions = new Map([
    [0, "Было бы неплохо"],
    [1, "Хочу, но может подождать"],
    [2, "Очень нужно!"],
  ]);

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
      <div className="bg-secondary px-3.5 pt-3 pb-2.5 rounded-md w-fit">
        <Rating
          value={priority + 1}
          onValueChange={(value) => setPriority(value - 1)}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <RatingButton
              key={index}
              icon={<Sparkles />}
              size={16}
              className="text-primary"
            />
          ))}
        </Rating>
      </div>
      <p className="text-muted-foreground text-sm">
        {descriptions.get(priority)}
      </p>
    </div>
  );
}
