import React from 'react';
import styles from './css/loterry-jackpot.module.css';
import * as ROUTES from '../../constants/routes'

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
                  <p>play for just $3.00 USD</p>
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
                  <h2>Tutan Festival</h2>
                  <a href={ROUTES.BUY_TICKETS}>
                    Buy a Ticket
                  </a>
                  <p>1 ticket for $3.00 USD</p>
                </div>

              </div>
            </div>


            {/* 3. atractive image */}
            <div className={`${styles.lotteryJackpotRight}`} >
              <div className={`${styles.lotteryJackpotRightWrapper}`} >

                {/* <iframe 
              src="https://lottie.host/?file=564ebfd7-d72e-4eba-b9dc-7b24c2859fa7/4poemJrepc.json"
              style={{ width: '100%', height: '100%' }}
              ></iframe> */}

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LotteryJackpot