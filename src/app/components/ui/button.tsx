import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:-translate-y-[1px] active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-violet-500 text-primary-foreground border border-blue-500/70 shadow-[0_4px_0_rgba(30,64,175,0.9),0_10px_22px_rgba(37,99,235,0.32)] hover:from-blue-700 hover:to-violet-600 hover:shadow-[0_5px_0_rgba(30,64,175,0.95),0_12px_24px_rgba(37,99,235,0.34)] active:shadow-[0_2px_0_rgba(30,64,175,0.85),0_6px_14px_rgba(37,99,235,0.28)]",
        destructive:
          "bg-gradient-to-r from-rose-500 to-red-600 text-white border border-red-600 shadow-[0_4px_0_rgba(159,18,57,0.85),0_10px_22px_rgba(225,29,72,0.28)] hover:from-rose-600 hover:to-red-700 active:shadow-[0_2px_0_rgba(159,18,57,0.8),0_6px_14px_rgba(225,29,72,0.24)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-[0_4px_0_rgba(147,197,253,1),0_9px_20px_rgba(99,102,241,0.16)] hover:from-blue-100 hover:to-indigo-100 hover:text-blue-800 active:shadow-[0_2px_0_rgba(147,197,253,0.95),0_5px_12px_rgba(99,102,241,0.13)] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border border-cyan-500/70 shadow-[0_4px_0_rgba(13,148,136,0.9),0_10px_22px_rgba(20,184,166,0.28)] hover:from-emerald-600 hover:to-cyan-600 active:shadow-[0_2px_0_rgba(13,148,136,0.85),0_6px_14px_rgba(20,184,166,0.24)]",
        ghost:
          "text-indigo-700 bg-indigo-50/60 border border-indigo-100 shadow-[0_3px_0_rgba(199,210,254,1),0_8px_18px_rgba(79,70,229,0.14)] hover:bg-indigo-100 hover:text-indigo-800 active:shadow-[0_1px_0_rgba(199,210,254,1),0_5px_12px_rgba(79,70,229,0.12)] dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline hover:text-violet-600",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
