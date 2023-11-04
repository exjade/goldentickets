import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Tickets from './buytickets/tickets'
// import DisplayDraw from './show-draw/draw'
import Wallet from '../modal';
import DropDownUserHeader from '../dropdown/user-header';

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

      {
        props.dropdown && (
          <>
            <DropDownUserHeader
              dropdown={props.dropdown}
              setDropdown={props.setDropdown}
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
  dropdown: PropTypes.bool,
  setDropdown: PropTypes.func,
}