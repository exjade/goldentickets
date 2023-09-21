import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../error/error';
import Header from '../components/Header/landing';

const Landing = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Error>
          <Header />
        </Error>

      </motion.div>
    </AnimatePresence>
  )
}

export default Landing