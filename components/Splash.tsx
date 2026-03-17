import { motion } from 'motion/react';

export default function Splash() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-void-black z-50"
    >
      <div className="relative">
        <motion.h1
          animate={{
            x: [0, -2, 2, -2, 0],
            y: [0, 2, -2, 2, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="text-7xl font-anton text-white glitch-text uppercase tracking-tighter"
          data-text="VOID"
        >
          VOID
        </motion.h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-neon-pink opacity-50 mix-blend-screen"></div>
      </div>
      <p className="mt-4 font-mono text-neon-green text-xs tracking-widest uppercase opacity-70">
        System Error // Loading
      </p>
    </motion.div>
  );
}
