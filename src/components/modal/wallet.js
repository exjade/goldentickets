import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/wallet.module.css';
import Breadcrumbwallet from '../breadcrumbs/wallet';
import CoinNetwork from '../coin-network/coin-network';

const Wallet = (props) => {
  return (
    <div className={`${styles.modalBackground}`} >
      <div className={`${styles.container}`} >
        <div className={`${styles.wrapper}`} >

          {/* BREADCRUMB NAV */}
          <header className={`${styles.header}`} >
            <Breadcrumbwallet
              iconOne={`account_balance`}
              textOne={`Deposit`}
              iconTwo={`payments`}
              textTwo={`Withdraw`}
              iconThree={`collections_bookmark`}
              textThree={`Address Book`}
              closeModal={props.closeModal}
            />
          </header>
          {/* DEPOSIT - DEPOSIT HISTORY */}
          <div className={`${styles.depositContainer}`} >
            <span className={`${styles.depositWrapper}`} >
              <h4>deposit</h4>
              <p>Deposit History</p>
            </span>
          </div>

          <div className={`${styles.divider}`}></div>

          {/* SELECT COIN & NETWORK */}
          <div className={`${styles.coinNetworkContainer}`} >
            <CoinNetwork />
          </div>

          <div className={`${styles.divider}`}></div>

          {/* GENERATE & DISPLAY DEPOSIT ADDRESS */}

          <div className={`${styles.generateContainer}`} >
            <div className={`${styles.generateWrapper}`} >

              <span className={`${styles.generateAddress}`}>

                <img
                  src="assets/blockchain/address_icon.png"
                  alt="network"
                  className={`${styles.wrapper}`}
                />
                <h2>Generate Deposit Address</h2>
                <p>Please generate new deposit wallet address,
                  to enable sending funds to your account</p>

                <button
                  type='button'
                  className={`${styles.button}`}
                >
                  Generate
                </button>
              </span>



            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Wallet

Wallet.propTypes = {
  closeModal: PropTypes.func,
}