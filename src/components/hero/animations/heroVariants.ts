import { AnimationVariants } from '../types';

export const heroVariants: AnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },
  
  sleek: {
    hidden: {
      opacity: 0,
      filter: "blur(20px)",
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.3,
      },
    },
  },

  fast: {
    hidden: {
      x: -300,
      opacity: 0,
      skewX: -20,
      scale: 0.8,
    },
    visible: {
      x: 0,
      opacity: 1,
      skewX: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 1.4, // Diubah dari 0.2 menjadi 1.4 (1.2 durasi animasi sleek + 0.2 delay awal)
      },
    },
  },

  trafficLight: {
    hidden: {
      opacity: 0,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 2.2,
      },
    },
  },

  and: {
    hidden: {
      x: 120,
      opacity: 0,
      skewX: 8,
    },
    visible: {
      x: 0,
      opacity: 1,
      skewX: 0,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 3.0,
      },
    },
  },

  ghostText: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 3.8,
      },
    },
  },

  afterMobile: {
    hidden: {
      opacity: 0,
      x: -20,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 5.2,
      },
    },
  },

  launch: {
    hidden: {
      y: 80,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 5.2,
      },
    },
  },

  launchMobile: {
    hidden: {
      y: 80,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 5.4,
      },
    },
  },

  anime: {
    hidden: {
      y: 80,
      opacity: 0,
      rotate: 10,
      scale: 0.7,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 5.4,
      },
    },
  },

  animeMobile: {
    hidden: {
      y: 80,
      opacity: 0,
      rotate: 10,
      scale: 0.7,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 5.6,
      },
    },
  },

  subtitle: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.5, 1, 0.89, 1],
        delay: 6.4,
      },
    },
  },
};
