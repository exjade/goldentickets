import React from 'react';
import PropTypes from 'prop-types'
import styles from './css/lucky-numbers.module.css';

const LuckyNumbers = (props) => {


  return (

    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        <div className={`${styles.ticketsContainer}`}>


          <div
            className={`${styles.tickets}`}
          >

            {/* Top title */}
            <div className={`${styles.top}`}>

            </div>


            <div className={`${styles.middle}`}>
              <span className={`${styles.middleLeft}`}></span>

              <span className={`${styles.middleLeftLuckyNumber}`}>
                <p>lucky</p>
                <p>numbers</p>
              </span>

              <span className={`${styles.ticketBall}`}>
                <p>56</p>
              </span>
              <span className={`${styles.ticketBall}`}>
                <p>56</p>
              </span>
              <span className={`${styles.ticketBall}`}>
                <p>56</p>
              </span>
              <span className={`${styles.ticketBall}`}>
                <p>56</p>
              </span>
              <span className={`${styles.ticketBall}`}>
                <p>56</p>
              </span>

              < span className={`${styles.ticketOwned}`}>
                <p>33</p>
              </span>

              <span className={`${styles.middleRight}`}></span>
            </div>

            {/* bottom  ticket */}
            <div className={`${styles.bottom}`} >


            </div>
          </div>


        </div>

      </div>
    </div >

  )
}

export default LuckyNumbers
LuckyNumbers.propTypes = {
  filterTickets: PropTypes.array,
}