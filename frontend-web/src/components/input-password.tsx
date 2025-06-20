import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className={cn("relative w-full")}>
        <input
          ref={ref}
          type={show ? "text" : "password"}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-primary",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShow((prev) => !prev)}
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent hover:bg-transparent focus:bg-transparent focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-transparent dark:focus:bg-transparent"
          tabIndex={-1}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
