import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../error/error';
import Header from '../components/Header/dashboard';
import Timeline from '../components/timeline';
import useModal from '../hooks/use-modal';

const Dashboard = () => {

  const { open, openModal, closeModal } = useModal()

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <Error>
            <Header 
            openModal={openModal}
            />
          </Error>

          <Error>
            <Timeline 
            open={open}
            closeModal={closeModal}
            />
          </Error>

        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Dashboard

