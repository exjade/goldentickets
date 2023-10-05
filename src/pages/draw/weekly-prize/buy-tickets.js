import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../../../error/error';
import Header from '../../../components/Header/dashboard';
import LandingHeader from '../../../components/Header/landing'
import useModal from '../../../hooks/use-modal';
import DrawTimeline from '../../../components/draw/game-modes/weekly';
import UserDrawTickets from '../../../components/draw/draw-tickets';
import useAuthListener from '../../../hooks/use-auth-listener';
import useWeeklyTickets from '../../../hooks/draw/weekly-prize/use-weeklyTickets';

const BuyTickets = () => {

  const {
    open,
    openModal,
    closeModal
  } = useModal()
  const { tickets } = useWeeklyTickets()
  const { user } = useAuthListener()


  const filterTickets = tickets?.filter(ticket => ticket.userId === user?.uid)

  return (
    <>
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
            <DrawTimeline
              open={open}
              closeModal={closeModal}
              user={user}
            />
          </Error>

          {
            filterTickets?.length > 0 && (
              <Error>
                <UserDrawTickets
                  filterTickets={filterTickets}
                />
              </Error>
            )
          }

        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default BuyTickets