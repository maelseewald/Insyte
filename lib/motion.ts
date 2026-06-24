import { type Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

// Drops in from the top in 3D — tilts back on the X axis and snaps upright
// (needs a `perspective` on the parent container).
export const dropIn: Variants = {
  hidden: { opacity: 0, y: -50, rotateX: -60, transformPerspective: 700 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 700,
    transition: { type: 'spring', stiffness: 120, damping: 16, mass: 1.1 },
  },
}
