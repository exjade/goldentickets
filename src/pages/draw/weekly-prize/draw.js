import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import Error from '../../../error/error';
import DisplayDraw from '../../../components/draw/show-draw/draw';
import * as ROUTES from '../../../constants/routes'
import useLastWinner from '../../../hooks/draw/use-lastWinner';


const Draw = () => {

  let history = useHistory()

  const handleRedirect = () => {
    history.push(ROUTES.DASHBOARD)
  }

  const { loterry } = useLastWinner()


  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <Error>
            <DisplayDraw
              handleRedirect={handleRedirect}
              loterry={loterry}
            />
          </Error>

        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Draw