import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/wallet.module.css';
import Breadcrumbwallet from '../breadcrumbs/wallet';
import useBreadcrumbs from '../../hooks/use-breakcrumbs';
import DepositWallet from './deposit-wallet/deposit';
import WithdrawWallet from './wallet-withdraw/withdraw';

const Wallet = (props) => {

  const { state, setState } = useBreadcrumbs()

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
              state={state}
              setState={setState}
            />
          </header>


          {
            state.stateOne ? (
              <DepositWallet />
            )
              :
              state.stateTwo ? (
                <WithdrawWallet />
              )
                :
                state.stateThree ? (
                  <>Address Book</>
                ) : <DepositWallet />
          }


        </div>
      </div>
    </div>
  )
}

export default Wallet

Wallet.propTypes = {
  closeModal: PropTypes.func,
}