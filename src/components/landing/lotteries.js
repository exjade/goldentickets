import React from 'react';
import styles from './css/lotteries.module.css';
import TicketNumber from './ticket/ticket-number';
import LuckyNumbers from './lucky-numbers';

const Lotteries = () => {
  return (
    <>



      <div className={`${styles.container}`} >
        <div className={`${styles.wrapper}`} >

          <div className={`${styles.lotteryCard}`} >
            <div className={`${styles.lotteryCardWrapper}`} >

              <div className={`${styles.luckyNumbers}`} >
                <LuckyNumbers />
              </div>

              <div className={`${styles.lotteryCardHeader}`} >
                <span className={`${styles.lotteryCardHeaderTitle}`} >
                  <p>Lottery</p>
                  <p>Numbers</p>
                  <p>Time</p>
                  <p>Players</p>
                  <p>Prize</p>
                </span>
              </div>

              <div className={`${styles.lotteryCardBreadcrumb}`} >
                <span className={`${styles.lotteryCardBreadcrumbTitle}`} >
                  <span className={`${styles.lotteryCardBreadcrumbHistory}`}>
                    <p>History</p>
                  </span>
                  <p>My Winnings</p>
                  <p>My Tickets</p>
                </span>
              </div>

              <div className={`${styles.lotteryHistory}`} >
                <div className={`${styles.lotteryHistoryWrapper}`} >

                  {/* NOMBRE DE LOTERIA */}
                  <span className={`${styles.lotteryHistoryName}`}>
                    <p>Classic</p>
                  </span>
                  {/* NUMBERS */}
                  <TicketNumber />
                  {/* TIME */}
                  <span className={`${styles.lotteryHistoryName}`}>
                    <p>3:21 pm</p>
                  </span>
                  {/* AMOUNT PLAYERS */}
                  <span className={`${styles.lotteryHistoryName}`}>
                    <p>3/100</p>
                  </span>
                  {/* PRIZE */}
                  <span className={`${styles.lotteryHistoryPrize}`}>
                    <p>$100</p>
                  </span>

                </div>
              </div>




            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Lotteries