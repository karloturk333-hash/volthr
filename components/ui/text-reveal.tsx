"use client"

import { FC, ReactNode, useRef, useMemo } from "react"
import { m, MotionValue, useScroll, useTransform, easeOut } from "motion/react"
import { cn } from "@/lib/utils"

interface TextRevealByWordProps {
  text: string
  className?: string
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  const words = useMemo(() => text.split(" "), [text])

  // Each word animates over 40% of the scroll range.
  // Step between word starts = (1 - 0.4) / (n - 1), so words cascade-overlap.
  const d = 0.4
  const s = words.length > 1 ? (1 - d) / (words.length - 1) : 1

  return (
    <div
      ref={targetRef}
      data-testid="text-reveal-container"
      className={cn("relative z-0 h-[140vh]", className)}
    >
      <div className="sticky top-0 mx-auto flex h-screen max-w-4xl items-center px-[1rem] py-[5rem]">
        <p className="flex flex-wrap p-5 font-space text-2xl font-bold text-[#0D0D0D]/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl">
          {words.map((word, i) => {
            const start = i * s
            const end = start + d
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1], { ease: easeOut })
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <m.span data-testid="text-reveal-word" style={{ opacity }} className="text-[#0D0D0D]">
        {children}
      </m.span>
    </span>
  )
}

export { TextRevealByWord }
