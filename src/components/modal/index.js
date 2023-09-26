import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/wallet.module.css';
import Breadcrumbwallet from '../breadcrumbs/wallet';
import useBreadcrumbs from '../../hooks/use-breakcrumbs';
import DepositWallet from './deposit-wallet/deposit';
import WithdrawWallet from './wallet-withdraw/withdraw';
import useCreatePayment from '../../hooks/use-create-payments';
import { v4 as uuidv4 } from 'uuid';

const Wallet = (props) => {
  // States
  const [currency, setCurrency] = useState('')
  const [amount, setAmount] = useState(0)
  const [generateQr, setGenerateQr] = useState(false)
  const [error, setError] = useState('')


  //Hooks
  const orderId = uuidv4();
  const { state, setState } = useBreadcrumbs()

  //eslint-disable-next-line
  const { pay } = useCreatePayment({ generateQr, orderId, amount, currency, setError })


  const coinImages = {
    trc20: {
      img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      name: 'usdt'
    },
    bep20: {
      img: 'assets/blockchain/usdt-bsc.png',
      name: 'usdt'
    },
    btc: {
      img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
      name: 'btc'
    },
    eth: {
      img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      name: 'eth'
    },
    trx: {
      img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png',
      name: 'trx'
    },
    ada: {
      img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
      name: 'ada'
    },
    xrp: {
      img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
      name: 'xrp'
    },
  }

  const handleClose = () => {
    setCurrency('')
    setAmount(0)
    setGenerateQr(false)
    props.closeModal()
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
              handleClose={handleClose}
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
                pay={pay}
                setGenerateQr={setGenerateQr}
                generateQr={generateQr}
                error={error}
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