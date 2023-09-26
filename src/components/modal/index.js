import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './css/wallet.module.css';
import Breadcrumbwallet from '../breadcrumbs/wallet';
import useBreadcrumbs from '../../hooks/use-breakcrumbs';
import DepositWallet from './deposit-wallet/deposit';
import WithdrawWallet from './wallet-withdraw/withdraw';
import useCreatePayment from '../../hooks/use-create-payments';
import { v4 as uuidv4 } from 'uuid';
import useUser from '../../hooks/use-user';
//firebase
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Wallet = (props) => {

  useEffect(() => {
    document.title = 'Wallet | GOLDENTICKETS.CLUB';
  }, []); //eslint-disable-line

  // States
  const [currency, setCurrency] = useState('')
  const [amount, setAmount] = useState(0)
  const [generateQr, setGenerateQr] = useState(false)
  const [error, setError] = useState('')

  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [withdrawAddress, setWithdrawAddress] = useState('')


  //Hooks
  const orderId = uuidv4();
  const { state, setState } = useBreadcrumbs()
  const { user } = useUser()

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


  const handleChangeAmount = (e) => {
    setWithdrawAmount(e.target.value)
  }
  const handleChangeAddress = (e) => {
    setWithdrawAddress(e.target.value)
  }

  const [withdrawalAmountError, setWithdrawalAmountError] = useState('')
  const [loader, setLoader] = useState('')
  const [loaderError, setLoaderError] = useState('')

  const bankInformation = {
    tether: {
      Currency: 'TETHER',
      BankName: 'Tether (USDT)',
      AccountNumber: user?.wallet,
      AccountName: user?.username,
      WithdrawalAmount: user?.Withdrawal
    },
  }

  const data = {
    CustomerId: user?.userId,
    CustomerName: user?.username,
    CustomerEmail: user?.emailAddress,
    CustomerWallet: user?.wallet,
    CustomerCurrentBalance: user?.Balance,
    CustomerCurrentWithdrawal: user?.Withdrawal,
    CustomerLastWithdrawal: user?.Withdrawal,
    WithdrawalAmount: parseInt(withdrawAmount) === parseInt(user?.Withdrawal) ? parseInt(user?.Withdrawal) : withdrawAmount,
    WithdrawalFee: withdrawAmount * 0.05,
    WithdrawalStatus: 'Pending',
    WithdrawalId: uuidv4(),
    WithdrawalDate: Date.now(),
    WithdrawalInformation: bankInformation,
    WithdrawalCurrency: 'TETHER',
    WithdrawalURL: '',
    AdminName: '',
    isReinvestment: false,
  }

  // Withdrawal Manual Request
  const makeWithdrawalRequest = async () => {
    try {
      if (data?.CustomerId === user?.userId) {
        if (data?.CustomerId !== '') {
          if (parseInt(withdrawAmount) <= parseInt(user?.Withdrawal)) {
            if (parseInt(user?.Withdrawal) >= 20 && parseInt(withdrawAmount) >= 20) {
              //eslint-disable-next-line no-unused-vars
              const docRef = await addDoc(collection(firestore, 'Withdrawals'), data);
              const userRef = doc(firestore, 'users', user.docId);
              setLoader(true)
              if (parseInt(user?.Withdrawal) >= 20) {
                await updateDoc(userRef, {
                  Withdrawal: parseInt(withdrawAmount) === parseInt(user?.Withdrawal) ? 0 : parseInt(user?.Withdrawal) - withdrawAmount,
                })
              }
            } else {
              setWithdrawalAmountError('Sorry, the minimum withdrawal amount is ($20 USD)')
            }
          } else {
            setWithdrawalAmountError('ERROR: You cannot withdraw more than available')
          }
        }
      }
      setTimeout(() => {
        setLoaderError('')
        setWithdrawalAmountError('')
        setLoader(false)
        setTimeout(() => {
          window.location.reload()
        }, 50)
      }, 2500)
    } catch (err) {
      console.log(err)
    }
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
                <WithdrawWallet
                  setCurrency={setCurrency}
                  currency={currency}
                  coinImages={coinImages}
                  setAmount={setAmount}
                  amount={amount}
                  user={user}
                  handleChangeAmount={handleChangeAmount}
                  handleChangeAddress={handleChangeAddress}
                  withdrawAmount={withdrawAmount}
                  withdrawAddress={withdrawAddress}
                  loaderError={loaderError}
                  loader={loader}
                  withdrawalAmountError={withdrawalAmountError}
                  makeWithdrawalRequest={makeWithdrawalRequest}
                />
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