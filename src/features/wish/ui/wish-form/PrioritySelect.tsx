import { Rating, RatingButton } from "@/shared/ui/kit/rating";
import { Rocket } from "lucide-react";

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
    <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-2.5">
      <div className="bg-secondary px-2.5 pt-2 pb-1.5 rounded-md w-fit">
        <Rating
          value={priority + 1}
          onValueChange={(value) => setPriority(value - 1)}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <RatingButton
              key={index}
              icon={<Rocket />}
              size={16}
              className="text-muted-foreground"
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
