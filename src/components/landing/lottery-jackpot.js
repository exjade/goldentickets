import React from 'react';
import styles from './css/loterry-jackpot.module.css';
import Lottie from 'lottie-react';
import AnimationCoinRain from './lottie/animation_chest.json'

const LotteryJackpot = () => {
  return (
    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        <div className={`${styles.lotteryJackpotBackground}`} >
          <div className={`${styles.lotteryJackpot}`} >

            <div className={`${styles.lotteryJackpotLeft}`} >
              <div className={`${styles.lotteryJackpotLeftWrapper}`} >

                {/*  title, subtitle,  */}
                <span className={`${styles.lotteryJackpotLeftTitle}`}>
                  <h2 className=''>lottery jackpot</h2>
                  <p>play for just $1.00</p>
                </span>

                {/*  prize  */}
                <span className={`${styles.lotteryJackpotLeftPrize}`}>
                  <p>$100,000</p>
                </span>

              </div>
            </div>


            {/* 2. subtitle, countdown for draw, redirect to buy a ticket, pricing */}
            <div className={`${styles.lotteryJackpotMiddle}`} >
              <div className={`${styles.lotteryJackpotMiddleWrapper}`} >


                <div className={`${styles.lotteryJackpotMiddleCard}`}>
                  <h3>Next Drawn In</h3>
                  <h2>22h:34m:56s</h2>
                  <button>
                    Buy a Ticket
                  </button>
                  <p>1 ticket for $1.00</p>
                </div>

              </div>
            </div>


            {/* 3. atractive image */}
            <div className={`${styles.lotteryJackpotRight}`} >
              <div className={`${styles.lotteryJackpotRightWrapper}`} >

                <Lottie
                  animationData={AnimationCoinRain}
                  style={{ width: '100%', height: '100%' }}
                />

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LotteryJackpot