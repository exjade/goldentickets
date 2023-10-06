import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import Tickets from './buytickets/tickets'
// import DisplayDraw from './show-draw/draw'
import Wallet from '../modal';

const DrawTimeline = (props) => {

  useEffect(() => {
    document.title = 'Buy Tickets | GOLDENTICKETS.CLUB';
}, []); //eslint-disable-line


  return (
    <>
      {
        props.open && (
          <>
            <Wallet
              closeModal={props.closeModal}
            />
          </>
        )
      }

      {/* <DisplayDraw /> */}
      <Tickets 
       authUser={props.user}
      />
    </>
  )
}

export default DrawTimeline

DrawTimeline.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  user: PropTypes.object,
}