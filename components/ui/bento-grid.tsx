import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        // Mobile-first: single column, auto height
        // sm (640px): 2-column grid with fixed row height
        // lg (1024px): 3-column bento with taller rows
        "grid w-full gap-4",
        "grid-cols-1 auto-rows-auto",
        "sm:grid-cols-2 sm:auto-rows-[18rem]",
        "lg:grid-cols-3 lg:auto-rows-[22rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: LucideIcon;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative min-h-[200px] sm:min-h-0",
      className,
    )}
  >
    {/* Outer glow border wrapper */}
    <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-[#E8E6E0] p-2 md:rounded-[1.5rem] md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />

      {/* Inner card content */}
      <div
        className={cn(
          "relative flex h-full flex-col justify-between overflow-hidden rounded-xl",
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        )}
      >
        <div>{background}</div>

        {/* Content: no animations on mobile (touch), hover-slide only on sm+ */}
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 sm:transform-gpu sm:transition-all sm:duration-300 sm:group-hover:-translate-y-6">
          <Icon className="h-12 w-12 origin-left text-neutral-700 sm:transform-gpu sm:transition-all sm:duration-300 sm:ease-in-out sm:group-hover:scale-90" />
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            {name}
          </h3>
          <p className="max-w-lg text-neutral-400">{description}</p>
        </div>

        {/*
          CTA:
          - Mobile: always visible, static at the bottom of the flex column
          - sm+: absolutely positioned, hidden (opacity-0 + translate-y-10), revealed on group-hover
        */}
        <div
          className={cn(
            "flex w-full flex-row items-center px-4 pb-4",
            "sm:pointer-events-none sm:absolute sm:bottom-0 sm:translate-y-10 sm:opacity-0",
            "sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100",
          )}
        >
          <a
            href={href}
            className="pointer-events-auto inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium hover:bg-[#f4f4f5] hover:text-[#0D0D0D]"
          >
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        {/* Hover overlay — sm+ only, no visual change on touch */}
        <div className="pointer-events-none absolute inset-0 sm:transform-gpu sm:transition-all sm:duration-300 sm:group-hover:bg-black/[.03]" />
      </div>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
