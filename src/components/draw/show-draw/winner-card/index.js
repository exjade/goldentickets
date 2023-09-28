import React from 'react';
import PropTypes from 'prop-types'
import styles from '../css/draw.module.css';
import Lottie from 'lottie-react';
import animationPrize from '../lottie/animation-prize.json'
import animationWinner from '../lottie/animation_winner.json'


const WinnerCard = (props) => {
  return (
    <button
      type='button'
      className={`${styles.card}`}
      onClick={() => props.handleRedirect()}
    >

      <div className={`${styles.cardContainer}`} >
        <div className={`${styles.cardWrapper}`} >

          <div className={`${styles.userCard}`}>
            <div className={`${styles.hexagon}`} >

              {
                props?.loterry[0]?.numeroGanador !== 0 ?
                  (
                    <Lottie
                      animationData={animationWinner}
                    />
                  ) : (
                    <Lottie
                      animationData={animationPrize}
                    />
                  )
              }

            </div>
            <h2>
              {
                props?.loterry[0]?.numeroGanador !== 0 ?
                  (
                    <p>
                      {props?.loterry[0]?.ultimoGanador?.username}
                    </p>
                  ) : (
                    <p>
                      No Winner!
                    </p>
                  )

              }

            </h2>
            {
              props?.loterry[0]?.numeroNoGanador > 0 &&
              <h4>
                The prize will be accumulated and awarded to the winner of the next lottery!
              </h4>
            }

          </div>

          <div className={`${styles.LotteryInfo}`}>
            <div className={`${styles.LotteryWrapper}`}>

              <span className={`${styles.WinnerNumber}`}>
                {
                  props?.loterry[0]?.numeroGanador !== 0 ?
                    (
                      <p>
                        {props?.loterry[0]?.numeroGanador}
                      </p>
                    ) : (
                      <p>
                        {props?.loterry[0]?.numeroNoGanador}
                      </p>
                    )

                }
              </span>
              <p>Winning Number</p>
            </div>


            <div className={`${styles.WinnerWrapper}`}>

              <span className={`${styles.WinnerPrize}`}>
                <p>
                  {parseFloat(props?.loterry[0]?.premioAcumulado).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </p>
                <h4 className='test-xl font-semibold text-white-normal'>USDT</h4>
              </span>
              {
                props?.loterry[0]?.numeroGanador !== 0 ?
                  (
                    <p>
                      Prize
                    </p>
                  ) : (
                    <p>
                      Accumulator
                    </p>
                  )

              }
            </div>
          </div>

        </div>
      </div>
    </button>
  )
}

export default WinnerCard

WinnerCard.propTypes = {
  handleRedirect: PropTypes.func,
  loterry: PropTypes.array,
}