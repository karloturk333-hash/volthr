"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#F5F4F0] text-[#0D0D0D] overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `[--aurora-white:repeating-linear-gradient(100deg,var(--aurora-bg)_0%,var(--aurora-bg)_7%,transparent_10%,transparent_12%,var(--aurora-bg)_16%)]`,
            `[--aurora:repeating-linear-gradient(100deg,var(--aurora-violet)_10%,var(--aurora-indigo)_15%,var(--aurora-blue)_20%,var(--aurora-violet-light)_25%,var(--aurora-indigo-dark)_30%)]`,
            "[background-image:var(--aurora-white),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "filter blur-[10px]",
            'after:content-[""] after:absolute after:inset-0',
            "after:[background-image:var(--aurora-white),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-aurora after:[background-attachment:fixed] after:mix-blend-multiply",
            "pointer-events-none",
            "absolute -inset-[10px] opacity-50 will-change-transform",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_80%)]"
          )}
        />
      </div>
      {children}
    </div>
  );
}
