import React from 'react';
import PropTypes from 'prop-types';
//loader
import RequestLoader from '../loader/request-loader';
//styles
import styles from '../../../styles/modules/withdrawal/withdrawal.module.css';
import { useTranslation } from 'react-i18next';

const AmericanCurrency = ({ makeWithdrawalRequest, user, loader, loaderError, isInvalid }) => {
  const { t } = useTranslation()
  const invalid = user?.Withdrawal <= 50;

  return (
    <div className={`${styles.cardContainer}`} id='theme_btn_light'>
      <div className={`${styles.cardWrapper} flex flex-col`} id='theme_btn_dark'>
        <div className={`${styles.withdrawalAmericanBackground} flex flex-col gap-14 mb-10`}>
          {/* LOGO */}
          <div className={`${styles.logoCard} flex flex-row justify-center mt-6 px-2.5 py-2.5 items-center gap-5`}>
            <img src="/assets/currency/american.png" alt="bitcoin wallet" className={`w-14 h-14`} />
            <h3 className='text-3xl h-12 text-white-normal'>USD</h3>
          </div>
          {/* zeller email */}
          <div className='grid grid-col-2 justify-center items-center  w-11/12 mx-6 gap-10'>
            <h3 className='text-normal font-bold text-white-normal'>{t('Zelle Email')}:</h3>
            <input
              className={`${styles.wallet} text-2xl font-semibold text-ellipsis text-black-normal rounded-md text-center w-full`}
              value={`${user?.bankInformationAmerican?.ZelleEmail === '' ||
                user?.bankInformationAmerican?.ZelleEmail === undefined ||
                user?.bankInformationAmerican?.ZelleEmail === null ?
                t('Please, add your Zelle Email')
                : `${user?.bankInformationAmerican?.ZelleEmail}`
                }`}
              readOnly
            />
          </div>
          {/* HOLDER NAME & TOTAL */}
          <div className='flex justify-between mx-8'>
            <div className={`${styles.holderName}`}>
              <h3 className='uppercase'>{user?.bankInformationAmerican?.ZelleHolderName}</h3>
            </div>
            <div className={`${styles.withdrawalTotal} flex flex-col gap-2 items-center justify-center`} >
              <p className='font-semibold text-xl capitalize text-end'>{t('Available_withdrawal')}</p>
              <div className={`${styles.amount}`} >
                <p className='font-semibold text-lg'>{`$${user?.Withdrawal}`}</p>
              </div>
            </div>
          </div>
        </div>
        {
          loader && (
            <RequestLoader
            />
          )
        }
        {
          loaderError !== '' && (
            <p className='font-bold text-red-warning text-lg mb-8'>{loaderError}</p>
          )
        }
        <div className={`${styles.cardButton} flex flex-col justify-center items-center w-1/4 h-full gap-5`} >
          {/* Reinvest Button */}
          {/* <button
            className={`${user?.Withdrawal >= 1 ? 'cursor-pointer hover:bg-green-success' : 'cursor-not-allowed'} flex justify-center items-center uppercase bg-green-button text-white-normal hover:bg-black-login_button
             hover:text-white-normal w-5/6 h-20  text-xl font-medium rounded-2xl`}
            onClick={() => makeReinvest()}
            disabled={invalid}
          >
            Reinvest & Keep Earning
          </button> */}
          {/* Request Button */}
          {
            !isInvalid ? (
              <button
                className={`${user?.Withdrawal >= 1 ? 'cursor-pointer hover:bg-black-login_button' : 'cursor-not-allowed'} flex justify-center items-center uppercase bg-black-background text-white-normal
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
                  className={`${user?.Withdrawal < 1 ? 'cursor-not-allowed hover:bg-red-warning' : 'cursor-pointer'} flex justify-center items-center uppercase bg-black-background text-white-normal
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

export default AmericanCurrency

AmericanCurrency.propTypes = {
  makeWithdrawalRequest: PropTypes.func.isRequired,
  makeReinvest: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  theme: PropTypes.object,
  loader: PropTypes.bool,
  loaderError: PropTypes.string,
  isInvalid: PropTypes.bool.isRequired
}