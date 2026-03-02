import React, { CSSProperties } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ShimmerBaseProps {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export type ShimmerButtonProps =
  | (ShimmerBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (ShimmerBaseProps & { href: string; onClick?: () => void })

function shimmerStyle(
  shimmerColor: string,
  shimmerSize: string,
  borderRadius: string,
  shimmerDuration: string,
  background: string,
): CSSProperties {
  return {
    "--spread": "90deg",
    "--shimmer-color": shimmerColor,
    "--radius": borderRadius,
    "--speed": shimmerDuration,
    "--cut": shimmerSize,
    "--bg": background,
  } as CSSProperties
}

const shimmerCls = (className?: string) =>
  cn(
    "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)]",
    "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
    className,
  )

function ShimmerInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      {children}
      <div className={cn(
        "insert-0 absolute size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
        "transform-gpu transition-all duration-300 ease-in-out",
        "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
        "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
      )} />
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
    </>
  )
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      href,
      ...props
    },
    ref,
  ) => {
    const style = shimmerStyle(shimmerColor, shimmerSize, borderRadius, shimmerDuration, background)

    if (href !== undefined) {
      return (
        <Link href={href} style={style} className={shimmerCls(className)} onClick={(props as { onClick?: () => void }).onClick}>
          <ShimmerInner>{children}</ShimmerInner>
        </Link>
      )
    }

    return (
      <button
        style={style}
        className={shimmerCls(className)}
        ref={ref}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <ShimmerInner>{children}</ShimmerInner>
      </button>
    )
  },
)

ShimmerButton.displayName = "ShimmerButton"

export { ShimmerButton }
