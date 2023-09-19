import React from 'react';
import PropTypes from 'prop-types';
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
         
          
        
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Dashboard

Dashboard.propTypes = {
  coins: PropTypes.array,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  theme: PropTypes.bool,
  setTheme: PropTypes.func,
}