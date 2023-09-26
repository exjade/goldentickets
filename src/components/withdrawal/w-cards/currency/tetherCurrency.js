import PropTypes from 'prop-types';
//loader
import RequestLoader from '../../loader/request-loader';
import PriceInput from './price'
//styles
import styles from '../../../../styles/modules/withdrawal/withdrawal.module.css';
import { useTranslation } from 'react-i18next';

const TetherCurrency = ({
  makeWithdrawalRequest,
  makeReinvest,
  user,
  loader,
  loaderError,
  isInvalid,
  withdrawalAmountError,
  withdrawalAmount,
  setWithdrawalAmount,
}) => {

  const invalid = user?.Withdrawal < 20

  const { t } = useTranslation()
  return (
    <div className={`${styles.cardContainer}`} id='theme_btn_light'>
      <div className={`${styles.cardWrapper} flex flex-col`} id='theme_btn_dark'>
        <div className={`${styles.withdrawalTetherBackground} flex flex-col gap-10 mb-10`}>

          {/* LOGO */}
          <div className={`${styles.logoCard} flex flex-row justify-center mt-6 px-2.5 py-2.5 items-center gap-5`}>
            <img src="/assets/currency/tether.png" alt="bitcoin wallet" className={`w-16 h-16`} />
            <h3 className='text-3xl h-12 text-white-normal'>USDT</h3>
          </div>
          {/* USDT ADDRESS */}
          <div className='grid grid-col-2 justify-center items-center w-full gap-10'>
            <h3 className='text-normal text-white-normal'>{t('USDT Address')}</h3>
            <input
              className={`${styles.wallet} text-2xl font-semibold  rounded-md text-start `}
              value={`
               ${user?.bankInformationTether?.Wallet === '' ||
                  user?.bankInformationTether?.Wallet === null ||
                  user?.bankInformationTether?.Wallet === undefined ?
                  'Update your information' :
                  user?.bankInformationTether?.Wallet
                }
              `}
              readOnly
            />
          </div>
          {/* HOLDER NAME & TOTAL */}
          <div className='grid grid-cols-2 mx-5 place-items-center justify-between '>
            <div className={`${styles.amountTether} w-3/5`} >
              <p className=' text-xl text-white-normal font-normal shadow-black-normal'>
                {parseFloat(user?.Withdrawal).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>
            </div>
            <div className={`${styles.holderName} items-center flex `}>
              <h4 className='font-bold text-gray-landing_feature shadow-white-withdrawal text-normal text-end uppercase'>{t('Available Amount')}</h4>
            </div>
          </div>
        </div>
        {
          loader && (
            <RequestLoader/>
          )
        }
        {/* ================= ERRORS ALERT =============*/}
        {
          loaderError !== '' && (
            <p className='font-bold text-red-warning text-lg mb-8'>{loaderError}</p>
          )
        }
        {/* ================= PRICE INPUT =============*/}
        <PriceInput
          withdrawalAmount={withdrawalAmount}
          setWithdrawalAmount={setWithdrawalAmount}
        />

        {/* ================================= BUTTONS =================================*/}
        <div className={`${styles.cardButton} flex flex-col justify-center items-center w-1/4 h-full gap-5`} >
          {/* Reinvest Button */}
          <button
            className={`${!invalid ?
              'cursor-pointer hover:bg-black-login_button' : 'cursor-not-allowed'} 
              flex justify-center items-center uppercase bg-green-button text-white-normal
             hover:bg-black-login_button hover:text-white-normal w-5/6 h-20  text-xl font-medium rounded-2xl`}
            onClick={() => makeReinvest()}
            disabled={invalid}
          >
            Reinvest & Keep Earning
          </button>


          {/* ERROR */}
          {
            withdrawalAmountError || user?.Withdrawal < 20 && (
              <>
                <p className='text-xl font-semibold text-red-warning break-normal text-center'>
                  {withdrawalAmountError}
                </p>
              </>
            )
          }

          {
            !isInvalid ? (
              <button
                className={`${user?.Withdrawal >= 20 &&
                  user?.bankInformationTether?.Wallet !== '' ?
                  'cursor-pointer hover:bg-black-login_button' : 'cursor-not-allowed'} flex justify-center items-center uppercase bg-black-background text-white-normal
                 hover:bg-black-login_button hover:text-white-normal w-5/6 h-20  text-xl font-medium rounded-2xl`}
                onClick={() => makeWithdrawalRequest()}
                disabled={invalid}
              >
                {t('Request_withdrawal')}
              </button>
            )
              :
              (
                <button
                  className={`${user?.Withdrawal <= 20 &&
                    user?.bankInformationTether?.Wallet !== '' ?
                    'cursor-not-allowed hover:bg-red-warning' : 'cursor-pointer'} flex justify-center items-center uppercase bg-black-background text-white-normal 
                  hover:bg-black-login_button hover:text-white-normal w-5/6 h-20  text-xl font-medium rounded-2xl`}
                  disabled
                >
                  {t('Request_withdrawal')}
                </button>
              )
          }
        </div>

      </div>
    </div>
  )
}

export default TetherCurrency

TetherCurrency.propTypes = {
  makeWithdrawalRequest: PropTypes.func.isRequired,
  makeReinvest: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  theme: PropTypes.object,
  loader: PropTypes.bool,
  loaderError: PropTypes.string,
  isInvalid: PropTypes.bool.isRequired,
  setWithdrawalAmount: PropTypes.func.isRequired,
  withdrawalAmount: PropTypes.number,
  withdrawalAmountError: PropTypes.string,
}