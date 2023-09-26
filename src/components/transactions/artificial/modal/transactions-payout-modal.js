import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/transactions.module.css'
import RequestLoader from '../../../withdrawal/loader/request-loader'
import {
  CubeTransparentIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import useMotion from '../../../../hooks/use-motion';

const TransactionsPayoutModal = (props) => {

  const { container, item } = useMotion()

  return (
    <motion.div
      className={`${styles.PayoutContainer}  font-Biryani`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className={`${styles.PayoutWrapper} flex flex-col mt-0 sm:mt-20 xl:mt-20 lg:mt-20 2xl:mt-20`} >

        {/* Currrency */}
        <form
          className='w-full h-full flex flex-col justify-center items-center gap-6 overflow-x-scroll my-10'
        >

          {
            props?.tabsWithdrawal?.wallet ?
              (<h2 className='text-xl sm:text-2xl text-white-normal text-center uppercase hidden sm:inline sm:mt-32'>Transfer request</h2>) :
              (<h2 className='text-xl sm:text-2xl text-white-normal text-center uppercase hidden sm:inline sm:mt-32'>Withdrawal request</h2>)
          }

          <div className={`${styles.selectContainer} mt-20 sm:mt-0`} >

            <p>Choose the wallet where you want to transfer your funds:</p>

            <div className={`${styles.selectWrapper}`} >

              <motion.button
                type='button'
                className={` ${props?.tabsWithdrawal?.wallet ? `${styles.activeButton}` : `${styles.selectButton}`} `}
                onClick={() => props.setTabsWithdrawal({
                  wallet: true,
                  external: false,
                })}
                variants={item}
              >
                <CubeTransparentIcon className='hidden w:10 h:10 sm:w-32  sm:h-32 sm:inline' />
                wallet
              </motion.button>
              <motion.button
                type='button'
                className={` ${props?.tabsWithdrawal?.external ? `${styles.activeButton}` : `${styles.selectButton}`} `}
                onClick={() => props.setTabsWithdrawal({
                  wallet: false,
                  external: true,
                })}
                variants={item}
              >
                <ExclamationTriangleIcon className='hidden w:10 h:10 sm:w-32  sm:h-32 sm:inline' />
                external
              </motion.button>

            </div>
          </div>

          {
            props?.tabsWithdrawal?.external &&
            (
              <>
                <motion.div
                  variants={item}
                  className='w-full flex flex-col justify-center items-center gap-4'>
                  <p className='capitalize text-lg sm:text-2xl font-medium text-start w-10/12 text-white-referralList'>Currency</p>
                  <input
                    type="text"
                    placeholder='USDT (TRC20)'
                    className='bg-black-background text-white-normal h-12 sm:h-14 w-10/12 rounded-md text-center text-md sm:text-xl'
                    disabled
                  />
                </motion.div>

                <motion.div
                  variants={item}
                  className='w-full flex flex-col justify-center items-center gap-4'>
                  <p className='capitalize text-lg sm:text-2xl font-medium text-start w-10/12 text-white-referralList'>Wallet Address</p>
                  <input
                    type="text"
                    placeholder={props?.user?.wallet}
                    className='bg-black-background text-white-normal h-12 sm:h-14 w-10/12 rounded-md text-center text-xs sm:text-xl'
                    disabled
                  />
                </motion.div>
                <motion.div
                  variants={item}
                  className='w-full flex flex-col justify-center items-center gap-4'>
                  <p className='capitalize text-lg sm:text-2xl font-medium text-start w-10/12 text-white-referralList'>Withdrawal Amount: ${props.user.Withdrawal.toFixed(2)}</p>
                  <input
                    type="number"
                    placeholder='Amount to withdrawal'
                    className='bg-black-background text-white-normal h-12 sm:h-14 w-10/12 rounded-md text-center text-md sm:text-xl'
                    onChange={(e) => props?.setWithdrawalAmount(e.target.value)}
                  />
                </motion.div>
                {/* SECURITY PIN */}
                {
                  props.pinError ?
                    <p className={styles.error}>{props?.pinError}</p> : ''
                }
                <motion.div
                  variants={item}
                  className='w-full flex flex-col justify-center items-center gap-4'>
                  <p className='capitalize text-lg sm:text-2xl font-medium text-start w-10/12 text-white-referralList'>Security Pin</p>
                  <input
                    type="password"
                    placeholder='Security PIN'
                    className='bg-black-background text-white-normal h-12 sm:h-14 w-10/12 rounded-md text-center text-md sm:text-xl'
                    onChange={(e) => props?.setPin(e.target.value)}
                  />
                </motion.div>
                {/* errors */}
                {
                  props?.withdrawalAmountError || parseInt(props?.user?.Withdrawal) < 10 || parseInt(props?.withdrawalAmount) < 10 ?
                    <p className={styles.error}>{props?.withdrawalAmountError}</p> : ''
                }
                {
                  props?.loaderError !== '' ?
                    <p className={styles.error}>
                      {props?.loaderError}
                    </p> : ''

                }

                <motion.div
                  variants={item}
                  className='flex flex-row sm:flex-col mb-10 gap-4 w-full justify-center sm:justify-between items-center'>

                  {/* REQUEST LOADING */}
                  {
                    props.loader && (
                      <RequestLoader />
                    )
                  }

                  <button
                    type='button'
                    className='bg-green-amount text-white-normal w-1/3 sm:w-6/12 h-16  pX-10 rounded-lg'
                    onClick={() => props?.makeWithdrawalRequest()}
                  >
                    Withdrawal
                  </button>
                  <button
                    type='button'
                    className='border-red-card border-2 border-solid text-white-normal w-1/3 sm:w-6/12 h-16  pX-10 rounded-lg'
                    onClick={() => props?.closeModal()}
                  >
                    Cancel
                  </button>
                </motion.div>
              </>
            )
          }

          {
            props?.tabsWithdrawal?.wallet &&
            (
              <>
                <motion.div
                  variants={item}
                  className='w-full flex flex-col justify-center items-center gap-4'>
                  <p className='capitalize text-lg sm:text-2xl font-medium text-start w-10/12 text-white-referralList'>Currency</p>
                  <input
                    type="text"
                    placeholder='USDT (TRC20)'
                    className='bg-black-background text-white-normal h-12 sm:h-14 w-10/12 rounded-md text-center text-md sm:text-xl'
                    disabled
                  />
                </motion.div>

                <motion.div
                  variants={item}
                  className='w-full flex flex-col justify-center items-center gap-4'>
                  <p className='capitalize text-lg sm:text-2xl font-medium text-start w-10/12 text-white-referralList'>Withdrawal Amount: ${props.user.Withdrawal.toFixed(2)}</p>
                  <input
                    type="number"
                    placeholder='Amount to Transfer'
                    className='bg-black-background text-white-normal h-12 sm:h-14 w-10/12 rounded-md text-center text-md sm:text-xl'
                    onChange={(e) => props?.setWithdrawalAmount(e.target.value)}
                  />
                </motion.div>
                {/* SECURITY PIN */}
                {
                  props.pinError ?
                    <p className={styles.error}>{props?.pinError}</p> : ''
                }
                <motion.div
                  variants={item}
                  className='w-full flex flex-col justify-center items-center gap-4'>
                  <p className='capitalize text-lg sm:text-2xl font-medium text-start w-10/12 text-white-referralList'>Security Pin</p>
                  <input
                    type="password"
                    placeholder='Security PIN'
                    className='bg-black-background text-white-normal h-12 sm:h-14 w-10/12 rounded-md text-center text-md sm:text-xl'
                    onChange={(e) => props?.setPin(e.target.value)}
                  />
                </motion.div>
                {/* errors */}
                {
                  props?.withdrawalAmountError || parseInt(props?.user?.Withdrawal) < 10 || parseInt(props?.withdrawalAmount) < 10 ?
                    <p className={styles.error}>{props?.withdrawalAmountError}</p> : ''
                }
                {
                  props?.loaderError !== '' ?
                    <p className={styles.error}>
                      {props?.loaderError}
                    </p> : ''

                }

                <motion.div
                  variants={item}
                  className='flex flex-row sm:flex-col mb-10 gap-4 w-full justify-center sm:justify-between items-center'>

                  {/* REQUEST LOADING */}
                  {
                    props.loader && (
                      <RequestLoader />
                    )
                  }

                  <button
                    type='button'
                    className='bg-green-amount text-white-normal w-1/3 sm:w-6/12 h-16  pX-10 rounded-lg'
                    onClick={() => props?.transferAvailable()}
                  >
                    Withdrawal
                  </button>
                  <button
                    type='button'
                    className='border-red-card border-2 border-solid text-white-normal w-1/3 sm:w-6/12 h-16  pX-10 rounded-lg'
                    onClick={() => props?.closeModal()}
                  >
                    Cancel
                  </button>
                </motion.div>
              </>
            )
          }



        </form>


      </div>
    </motion.div>
  )
}

export default TransactionsPayoutModal
TransactionsPayoutModal.propTypes = {
  user: PropTypes.object,
  setWithdrawalAmount: PropTypes.func,
  closeModal: PropTypes.func,
  makeWithdrawalRequest: PropTypes.func,
  loader: PropTypes.bool,
  loaderError: PropTypes.string,
  withdrawalAmount: PropTypes.any,
  withdrawalAmountError: PropTypes.string,
  setPin: PropTypes.func,
  pinError: PropTypes.string,
  tabsWithdrawal: PropTypes.object,
  setTabsWithdrawal: PropTypes.func,
  transferAvailable: PropTypes.func,
}