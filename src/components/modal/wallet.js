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