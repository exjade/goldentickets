import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/wallet.module.css';
import Breadcrumbwallet from '../breadcrumbs/wallet';

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
            <span className={`${styles.depositWrapper}`}>
              <h4>deposit</h4>
              <p>Deposit History</p>
            </span>
          </div>

          <div className={`${styles.divider}`}></div>

          {/* SELECT COIN & NETWORK */}

          {/* GENERATE & DISPLAY DEPOSIT ADDRESS */}

        </div>
      </div>
    </div>
  )
}

export default Wallet

Wallet.propTypes = {
  closeModal: PropTypes.func,
}