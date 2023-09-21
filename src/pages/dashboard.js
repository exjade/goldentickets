import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import Error from '../error/error';



const Dashboard = () => {

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

        

        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Dashboard

