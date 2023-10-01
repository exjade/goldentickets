import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../../error/error';
import Header from '../../components/Header/dashboard';
import LandingHeader from '../../components/Header/landing'
import useModal from '../../hooks/use-modal';
import DrawTimeline from '../../components/draw';
import UserDrawTickets from '../../components/draw/draw-tickets';
import useUserTickets from '../../hooks/draw/use-userTickets';
import useAuthListener from '../../hooks/use-auth-listener';

const BuyTickets = () => {

  const {
    open,
    openModal,
    closeModal
  } = useModal()
  const { tickets } = useUserTickets()
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