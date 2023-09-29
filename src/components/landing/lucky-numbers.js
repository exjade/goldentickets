import React from 'react';
import PropTypes from 'prop-types'
import styles from './css/lucky-numbers.module.css';
import useLuckyNumbers from '../../hooks/draw/use-luckyNumbers';

const LuckyNumbers = () => {

  const { luckyNumbers } = useLuckyNumbers()

  const orderByDate = luckyNumbers?.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })

  const getLuckynumbers = orderByDate?.map(number => number.numeroGanador)

  const LastLuckyNumber = getLuckynumbers?.slice(0, -1);
  const getLastNumber = getLuckynumbers?.pop()

  return (

    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        <div className={`${styles.ticketsContainer}`}>

          <span className={`${styles.middleLeftLuckyNumberMobile}`}>
            <p>lucky</p>
            <p>numbers</p>
          </span>

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


              {
                getLuckynumbers?.length > 0 ?
                  (
                    <>
                      {
                        LastLuckyNumber?.map((number, i) => (
                          <span key={i}
                            className={`${styles.ticketBall}`}>
                            <p>{number}</p>
                          </span>
                        ))
                      }
                      < span className={`${styles.ticketOwned}`}>
                      <p>{getLastNumber}</p>
                      </span>
                    </>
                  )
                  :
                  <>
                    <span
                      className={`${styles.ticketBall}`}>
                      <p></p>
                    </span>
                    <span
                      className={`${styles.ticketBall}`}>
                      <p></p>
                    </span>
                    <span
                      className={`${styles.ticketBall}`}>
                      <p></p>
                    </span>
                    <span
                      className={`${styles.ticketBall}`}>
                      <p></p>
                    </span>
                    < span className={`${styles.ticketOwned}`}>
                      <p></p>
                    </span>
                  </>
              }




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