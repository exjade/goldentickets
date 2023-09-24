import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/wallet.module.css';
import Breadcrumbwallet from '../breadcrumbs/wallet';
import useBreadcrumbs from '../../hooks/use-breakcrumbs';
import DepositWallet from './deposit-wallet/deposit';
import WithdrawWallet from './wallet-withdraw/withdraw';
// import useCreatePayment from '../../hooks/use-create-payments';

const Wallet = (props) => {

  const { state, setState } = useBreadcrumbs()

  // const { pay } = useCreatePayment()


  const [currency, setCurrency] = useState('')
  const [amount, setAmount] = useState(0)

  const coinImages = {
        trc20: {
          img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png'
        },
        bep20: {
          img: 'assets/blockchain/usdt-bsc.png'
        },
        btc: {
          img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
        },
        eth: {
          img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
        },
        trx: {
          img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png'
        },
        bnb: {
          img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
        },
        xrp: {
          img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png'
        },
  }

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
              <DepositWallet
                setCurrency={setCurrency}
                currency={currency}
                coinImages={coinImages}
                setAmount={setAmount}
                amount={amount}
              />
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