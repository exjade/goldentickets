import React from 'react';
import PropTypes from 'prop-types'
import styles from '../css/draw.module.css';

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
                    <iframe
                      src="https://lottie.host/?file=b367e77d-8d4e-443b-811f-57ffd8f7cc27/em65HEB7qR.json"
                      style={{ width: '200px', height: '200px' }}
                    >

                    </iframe>
                  ) :
                  (
                    <iframe
                      src="https://lottie.host/?file=ae082f6b-67b8-4e7f-a1f2-28c568af3486/1g4fPIhtci.json"
                      style={{ width: '200px', height: '200px' }}
                    ></iframe>
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
              props?.loterry[0]?.premioAcumulado > 0 &&
              props?.loterry[0]?.premioEntregado === 0 &&
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


                {/*If the CumulativePrize equals 0, it means that there was a winner. 
                  It must show the prizeDelivered to avoid showing a prize equal to $00.00.
                  If it is not equal to 0, it will show the accumulated so far because when no one wins the prize is added up. */}
                {
                  props?.loterry[0]?.premioAcumulado === 0 ? (<>
                    {
                      isNaN(props?.loterry[0]?.premioEntregado) ?
                        (
                          <p className=' bg-gray-loader w-24 h-10 animate-pulse my-4'>
                          </p>
                        )
                        :
                        (
                          <p>
                            {parseFloat(props?.loterry[0]?.premioEntregado).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </p>
                        )
                    }

                  </>) : (<>

                    {
                      isNaN(props?.loterry[0]?.premioAcumulado) ?
                        (
                          <p className=' bg-gray-loader w-24 h-10 animate-pulse my-4'>
                          </p>
                        )
                        :
                        (
                          <p>
                            {parseFloat(props?.loterry[0]?.premioAcumulado).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </p>
                        )
                    }
                  </>)
                }

                <h4 className='test-xl font-semibold text-white-normal'>USDT</h4>
              </span>
              {
                props?.loterry[0]?.numeroGanador !== 0 ?
                  (
                    <p>
                      Prize
                    </p>
                  ) : (
                    <p className='text-pink-primary text-2xl font-extrabold'>
                      Accumulator!
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