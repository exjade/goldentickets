import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';



const Dashboard = () => {


  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
         
          <p className='text-white-normal'>Dashboard hola</p>
        
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Dashboard

