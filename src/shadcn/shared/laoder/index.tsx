import type React from 'react';
import { motion } from 'framer-motion';

export const Loader: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-[80vh] '>
      <div className='relative'>
        <motion.div
          className='w-48 h-48 border-4 border-gray-200 rounded-full'
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
        <motion.div
          className='absolute top-0 left-0 w-48 h-48 border-t-4 border-gray-300 rounded-full'
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
        <motion.div
          className='absolute top-6 left-6 w-36 h-36 border-4 border-gray-200 rounded-full'
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <motion.div
            className='w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center'
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className='w-16 h-16 border-t-4 border-r-4 border-gray-400 rounded-full'
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            />
          </motion.div>
        </div>
      </div>
      <motion.p
        className='absolute mt-56 text-gray-600 text-xl font-light tracking-widest'
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: [0, 1, 0],
          y: [10, 0, 10],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        Loading
      </motion.p>
    </div>
  );
};
