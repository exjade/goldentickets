import React from 'react';
import styles from './css/lotteries-timeline.module.css'
import LotteryJackpot from './lottery-jackpot';
import Lotteries from './lotteries';
import LastWinners from './last-winners';

const LotteriesTimeline = () => {
  return (

    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        {/* LOTTERY JACKPOT */}
        <LotteryJackpot />

        {/* CURRENT LOTTERIES & LUCKY NUMBER */}
        <Lotteries />
        {/* LOTTERY STEPS FOR PLAY */}
        <LastWinners />
        {/* LAST 6 LOTTERIES HISTORY */}

        {/* LOTTERY INSTRUCTIONS */}

      </div>
    </div>

  )
}

export default LotteriesTimeline