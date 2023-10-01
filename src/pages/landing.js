import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../error/error';
import Header from '../components/Header/dashboard';
import LandingHeader from '../components/Header/landing';
import LotteriesTimeline from '../components/landing';
import Timeline from '../components/timeline';
import useModal from '../hooks/use-modal';
import useAuthListener from '../hooks/use-auth-listener';

const Landing = () => {
  const { open, openModal, closeModal } = useModal()
  const { user } = useAuthListener()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        {
          user?.uid === undefined || user?.uid === null ? (
            <Error>
              <LandingHeader />
            </Error>
          ) :
            (
              <Error>
                <Header
                  openModal={openModal}
                />
              </Error>
            )
        }

        <Error>
          <Timeline
            open={open}
            closeModal={closeModal}
          />
        </Error>

        <Error>
          <LotteriesTimeline />
        </Error>

      </motion.div>
    </AnimatePresence>
  )
}

export default Landing