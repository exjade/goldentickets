import React from 'react';
// import PropTypes from 'prop-types';
import styles from './css/coin-network.module.css';

const CoinNetwork = (
  // props
) => {
  return (
    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        <div className={`${styles.coin}`} >
          <img
            src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
            alt="USDT"
            className='w-8 h-8 object-contain'
          />
          <select
            name="coins"
            id="coins"
            className={`${styles.coinInput}`}
          >
            <option value="usdttrc20">USDT</option>
          </select>
        </div>


        <div className={`${styles.network}`} >
          <img
            src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
            alt="USDT"
            className='w-8 h-8 object-contain hidden sm:inline'
          />
          <select
            name="network"
            id="network"
            className={`${styles.networkInput}`}
          >
            <option value="usdtbep20">BEP20</option>
          </select>
        </div>

      </div>
    </div>
  )
}

export default CoinNetwork

CoinNetwork.propTypes = {

}