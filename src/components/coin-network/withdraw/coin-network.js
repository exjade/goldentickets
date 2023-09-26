import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/withdraw-network.module.css';

const CoinNetwork = (props) => {


  const handleChangeCurrency = (event) => {
    props.setCurrency(event.target.value);
    props.setAmount(0);
  };




  return (
    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >



        <div className={`${styles.network}`} >
          <img
            src='assets/casino/coin.png'
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
            src='assets/casino/bep20.png'
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