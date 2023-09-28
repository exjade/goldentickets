import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/withdraw-network.module.css';

const CoinNetwork = (props) => {


  return (
    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >



        <div className={`${styles.network}`} >
          <img
            src='https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fcasino%2Fcoin.png?alt=media&token=906e6a83-c7ba-46c2-8084-afddd489836d'
            alt="amount"
            className='w-8 h-8 object-contain'
          />

          <select
            name="currency"
            id="currency"
            className={`${styles.coinInput}`}
            value={props.currency}
          >
            <option value="usdtbsc">{props?.user?.Balance.toFixed(2)}</option>
          </select>

        </div>

        <div className={`${styles.network}`} >
          <img
            src={props.coinImages.bep20.img}
            alt="USDT"
            className='w-8 h-8 object-contain'
          />
          <input
            disabled
            type='text'
            name="amount"
            id="amount"
            value='Tether'
            className={`${styles.networkInput}`}
          />
        </div>

      </div>

      <div className={`${styles.networkBep}`} >
          <img
            src='https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fblockchain%2Fusdt-bsc.png?alt=media&token=6bd450f7-2db3-4e25-b58b-32a5f0c2e31a'
            alt="USDT"
            className='w-8 h-8 object-contain'
          />
          <input
            disabled
            type='text'
            name="amount"
            id="amount"
            value='BEP20'
            className={`${styles.networkInput}`}
          />
        </div>

    </div>
  )
}

export default CoinNetwork

CoinNetwork.propTypes = {
  currency: PropTypes.string,
  setCurrency: PropTypes.func,
  setGenerateQr: PropTypes.func,
  coinImages: PropTypes.object,
  amount: PropTypes.any,
  setAmount: PropTypes.func,
  user: PropTypes.object,
}