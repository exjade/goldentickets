import React from 'react';
import styles from './css/lotteries.module.css';
import LuckyNumbers from './lucky-numbers';
import LotteriesLoader from './loader/lotteries-loader';
import Accumulator from './game-modes/accumulator';
import WeeklyPrize from './game-modes/weekly-prize';
import useLastWinner from '../../hooks/draw/use-lastWinner';


const Lotteries = () => {

  const { loterry } = useLastWinner() // $100 USD - $1 per ticket

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



              {
                loterry[0]?.numeroGanador !== undefined ?
                  (
                    <Accumulator
                    />
                  ) : <LotteriesLoader />
              }
              {
                loterry[0]?.numeroGanador !== undefined ?
                  (
                    <WeeklyPrize
                    />
                  ) : <LotteriesLoader />
              }






            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Lotteries