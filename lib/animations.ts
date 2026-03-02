export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export const slideFromLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

export const slideFromRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const staggerContainerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const staggerContainerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

// Hero headline word stagger
export const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const heroWord = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

// Testimonial table rows — slide from left
export const testimonialRow = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export const staggerContainerTestimonials = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

// Work/projects grid — larger offset for dramatic entrance
export const projectCard = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export const staggerContainerProjects = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// CTA headline — large y offset
export const ctaHeadline = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}
