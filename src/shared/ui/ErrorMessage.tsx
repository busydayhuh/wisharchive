import alienError from "../assets/images/alien-error.svg";
import alienUrl from "../assets/images/alien.svg";
import { Button } from "./kit/button";

const ERROR_IMAGES = {
  "no-items": alienUrl,
  "default-error": alienError,
};

export function ErrorMessage({
  variant,
  message,
  description,
  withButton,
  buttonText,
  action,
}: {
  variant: keyof typeof ERROR_IMAGES;
  message: string;
  description?: string;
  withButton?: boolean;
  buttonText?: string;
  action?: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 lg:gap-5 pt-5 md:pt-10 lg:pt-16 w-full">
      <img
        src={ERROR_IMAGES[variant]}
        alt={message}
        className="opacity-90 mx-auto w-full max-w-3xs"
      />
      <div className="flex flex-col items-center gap-1">
        <p className="w-full max-w-3xs font-bold text-2xl text-center">
          {message}
        </p>
        {description && (
          <p className="w-full max-w-sm text-muted-foreground text-sm text-center">
            {description}
          </p>
        )}
      </div>
      {withButton && (
        <Button size="lg" className="mt-2 h-14" onClick={action}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
