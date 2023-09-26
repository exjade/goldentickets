import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/header.module.css';
import ToggleRounded from '../../toggle/rounded';
import useUser from '../../../hooks/use-user';

const Header = (props) => {

  const logo = `${process.env.REACT_APP_LOGO}`;
  const { user } = useUser()

  return (

    <header className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        {/* MENU */}
        <div className={`${styles.menu}`}>
          <button
            type='button'
            className={`${styles.button} cursor-pointer`}
            onClick={() => console.log('Open sidebar')}>
            <span className={`${styles.rotateIcon} material-symbols-outlined text-gray-primary`} >
              menu_open
            </span>
          </button>

          <div className={`${styles.brand}`} >
            <img
              src={logo}
              alt="logo"
              className={`${styles.img}`}
            />
            <p className={`${styles.font} text-white-normal uppercase hidden sm:inline`}>GoldenTickets</p>
          </div>

          {/* TOGGLE GAMBLING / LIVE */}
          <ToggleRounded
            gambling={`gambling`}
            live={`Sports`}
          />
        </div>



        {/* BALANCE & WALLET */}
        <div className={`${styles.auth}`} >
          <div className={`${styles.balances}`} >
            <span className={`${styles.coin}`}>
              <img
                src="assets/casino/gold_coin_icon.png"
                alt="coin"
                className={`${styles.coinImage} w-6 h-6 object-contain`}
              />
              <p className={`${styles.coinText}`}>
                {parseFloat(`${user?.Balance?.toFixed(0)}`).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>
            </span>

            <button
              type='button'
              className={`${styles.wallet}`}
              onClick={() => props.openModal()}
            >
              <span className="material-symbols-outlined text-white-normal">
                account_balance_wallet
              </span>
              <p className={`${styles.textWallet}`}>Wallet</p>
            </button>
          </div>



          {/* USER PROFILE & Chat */}
          <div className={`${styles.profile}`} >
            <button
              type='button'
              className={`${styles.circles}`}
              onClick={() => console.log('Open Profile Dropdown')}
            >
              <img
                src="assets/shiba/profile_shiba_inu.png"
                alt="shiba avatar"
                className='object-contain w-6 h-6 sm:w-8 sm:h-8'
              />
            </button>
            <button
              type='button'
              className={`${styles.circleChat}`}
              onClick={() => console.log('Open Chat Sidebar')}
            >
              <span className="material-symbols-outlined text-gray-secondary">
                sms
              </span>
            </button>
          </div>

        </div>


      </div>
    </header>
  )
}

export default Header

Header.propTypes = {
  openModal: PropTypes.func,
}