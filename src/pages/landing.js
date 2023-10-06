import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../error/error';
import Header from '../components/Header/dashboard';
import LandingHeader from '../components/Header/landing';
import LotteriesTimeline from '../components/landing';
import Timeline from '../components/timeline';
import useModal from '../hooks/use-modal';
import useAuthListener from '../hooks/use-auth-listener';
import useDropDown from '../hooks/use-dropdown';
import Footer from '../components/footer/footer';

const Landing = () => {

  const { open, openModal, closeModal } = useModal()
  const { user } = useAuthListener()
  const {
    dropdown,
    setDropdown,
    closeDropdown,
    openDropdown,
  } = useDropDown()

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
                  dropdown={dropdown}
                  closeDropdown={closeDropdown}
                  openDropdown={openDropdown}
                />
              </Error>
            )
        }

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

        <Error>
          <Footer />
        </Error>

      </motion.div>
    </AnimatePresence>
  )
}

export default Landing