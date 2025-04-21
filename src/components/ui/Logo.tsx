import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="flex items-center relative"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        bounce: 0.5
      }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.4, 0.6, 0.4], 
              scale: [0.8, 1.1, 0.8],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        )}
      </AnimatePresence>

      {/* Pulsing background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-violet-500/10 blur-md z-0"
        animate={{ 
          opacity: [0.3, 0.5, 0.3], 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />

      <motion.div
        className="relative z-10"
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ 
          rotate: [0, -10, 10, -5, 5, 0],
          transition: { duration: 0.8 }
        }}
      >
        <Gamepad2 size={32} className="text-violet-400 mr-2 drop-shadow-[0_0_8px_rgba(167,139,250,0.7)]" />
      </motion.div>
      <motion.div
        className="relative z-10"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.span 
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]"
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            N
          </motion.span>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            e
          </motion.span>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            x
          </motion.span>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.55 }}
          >
            u
          </motion.span>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            s
          </motion.span>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 drop-shadow-[0_0_8px_rgba(103,232,249,0.3)]"
          >
            Games
          </motion.span>
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Logo;