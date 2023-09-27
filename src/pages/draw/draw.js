import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../../error/error';
import Header from '../../components/Header/dashboard';
import useModal from '../../hooks/use-modal';
// import DisplayDraw from '../../components/draw/show-draw/draw';
import DrawTimeline from '../../components/draw';

const Draw = () => {

  const {
    // open,
    openModal,
    // closeModal
  } = useModal()

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
            <DrawTimeline />
          </Error>

        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Draw