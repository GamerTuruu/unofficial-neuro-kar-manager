import * as React from "react";

import { cn } from "@/lib/utils";
import { isAndroid } from "@/lib/android-utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // Use larger touch target on Android (48dp minimum)
    const sizeClasses = isAndroid()
      ? "h-14 text-base px-4 py-3"
      : "h-10 text-sm px-3 py-2";

    return (
      <input
        type={type}
        className={cn(
          `flex w-full rounded-md border border-input bg-background ${sizeClasses} ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
