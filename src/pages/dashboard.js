import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../error/error';
import Header from '../components/Header/dashboard';
import Timeline from '../components/timeline';
import useModal from '../hooks/use-modal';
import useDropDown from '../hooks/use-dropdown';
import LotteriesTimeline from '../components/landing';

const Dashboard = () => {

  const { open, openModal, closeModal } = useModal()
  const { dropdown, setDropdown } = useDropDown()

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
              dropdown={dropdown}
              setDropdown={setDropdown}
            />
          </Error>

          <Error>
            <Timeline
              open={open}
              closeModal={closeModal}
              setDropdown={setDropdown}
              dropdown={dropdown}
            />
          </Error>

          <Error>
            <LotteriesTimeline />
          </Error>

        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Dashboard

