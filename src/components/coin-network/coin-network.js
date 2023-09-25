import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/coin-network.module.css';

const CoinNetwork = (props) => {


  const handleChangeCurrency = (event) => {
    props.setCurrency(event.target.value);
    props.setAmount(0);
  };




  return (
    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        <form className={`${styles.coin}`} >

          {
            props.currency === 'usdttrc20' ?
              (
                <img
                  src={props.coinImages.trc20.img}
                  alt="USDT"
                  className='w-8 h-8 object-contain'
                />
              ) : props.currency === 'usdtbsc' ?
                (
                  <img
                    src={props.coinImages.bep20.img}
                    alt="USDT"
                    className='w-8 h-8 object-contain'
                  />
                ) : props.currency === 'btc' ? (
                  <img
                    src={props.coinImages.btc.img}
                    alt="USDT"
                    className='w-8 h-8 object-contain'
                  />
                )
                  : props.currency === 'eth' ? (
                    <img
                      src={props.coinImages.eth.img}
                      alt="USDT"
                      className='w-8 h-8 object-contain'
                    />
                  )
                    : props.currency === 'bnb' ? (
                      <img
                        src={props.coinImages.bnb.img}
                        alt="USDT"
                        className='w-8 h-8 object-contain'
                      />
                    )
                      : props.currency === 'xrp' ? (
                        <img
                          src={props.coinImages.xrp.img}
                          alt="USDT"
                          className='w-8 h-8 object-contain'
                        />
                      )
                        : props.currency === 'trx' ? (
                          <img
                            src={props.coinImages.trx.img}
                            alt="USDT"
                            className='w-8 h-8 object-contain'
                          />
                        )
                          : <img
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                            alt="USDT"
                            className='w-8 h-8 object-contain'
                          />
          }


          <select
            name="currency"
            id="currency"
            className={`${styles.coinInput}`}
            value={props.currency}
            onChange={handleChangeCurrency}
          >
            <option value="usdttrc20">USDT (TRC20)</option>
            <option value="usdtbsc">USDT (BEP20)</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
            <option value="bnb">BNB (BSC)</option>
            <option value="xrp">XRP</option>
            <option value="trx">Tron (TRX)</option>
          </select>
        </form>


        <div className={`${styles.network}`} >
          <p className='text-white-normal font-semibold text-xl'>$</p>
          <input
            type='number'
            name="amount"
            id="amount"
            value={props.amount}
            onChange={(event) => props.setAmount(event.target.value)}
            className={`${styles.networkInput}`}
          />
        </div>

      </div>
    </div>
  )
}

export default CoinNetwork

CoinNetwork.propTypes = {
  currency: PropTypes.string,
  setCurrency: PropTypes.func,
  coinImages: PropTypes.object,
  amount: PropTypes.any,
  setAmount: PropTypes.func,
}