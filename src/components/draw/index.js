import React from 'react'
import PropTypes from 'prop-types';
import Tickets from './buytickets/tickets'
// import DisplayDraw from './show-draw/draw'
import Wallet from '../modal';

const DrawTimeline = (props) => {



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
      <Tickets />
    </>
  )
}

export default DrawTimeline

DrawTimeline.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
}