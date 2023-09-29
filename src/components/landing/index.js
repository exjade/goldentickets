import React from 'react';
import styles from './css/lotteries-timeline.module.css'
import LotteryJackpot from './lottery-jackpot';

const LotteriesTimeline = () => {
  return (

    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        {/* LOTTERY JACKPOT */}
        <LotteryJackpot />

        {/* CURRENT LOTTERIES & LUCKY NUMBER */}

        {/* LOTTERY STEPS FOR PLAY */}

        {/* LAST 6 LOTTERIES HISTORY */}

        {/* LOTTERY INSTRUCTIONS */}

      </div>
    </div>

  )
}

export default LotteriesTimeline