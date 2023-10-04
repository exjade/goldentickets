import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import styles from './css/header.module.css';
import ToggleRounded from '../../toggle/rounded';
import useUser from '../../../hooks/use-user';
import useUserData from '../../../hooks/user/use-data';
import * as ROUTES from '../../../constants/routes'

const Header = (props) => {

  const logo = `${process.env.REACT_APP_LOGO}`;
  const { user } = useUser()
  const { activeUser } = useUserData()

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

          <Link to={ROUTES.DASHBOARD}>
            <div className={`${styles.brand}`} >
              <img
                src={logo}
                alt="logo"
                className={`${styles.img}`}
              />
              <p className={`${styles.font} text-white-normal uppercase hidden sm:inline`}>GoldenTickets</p>
            </div>
          </Link>

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
                src={'https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fcasino%2Fgold_coin_icon.png?alt=media&token=210e9686-d192-4973-9a0a-8662a7beea9a'}
                alt="coin"
                className={`${styles.coinImage} w-6 h-6 object-contain`}
              />
              {
                user?.Balance === null || user?.Balance === undefined ?
                  <p className={`${styles.coinText} animate-pulse bg-blue-primary w-12 h-4 rounded-sm opacity-10`}></p>
                  :
                  <p className={`${styles.coinText}`}>
                    {parseFloat(`${activeUser?.Balance}`).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </p>
              }

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

            {
              !props.dropdown ? (
                <button
                  type='button'
                  className={`${styles.circles}`}
                  onClick={() => props?.openDropdown()}
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fcasino%2Fprofile_shiba_inu.png?alt=media&token=8d8b1520-cc7b-4c00-a775-b3843fec2161"
                    alt="shiba avatar"
                    className='object-contain w-6 h-6 sm:w-8 sm:h-8'
                  />
                </button>
              ) :
                (
                  <button
                    type='button'
                    className={`${styles.circles}`}
                    onClick={() => props?.closeDropdown()}
                  >
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fcasino%2Fprofile_shiba_inu.png?alt=media&token=8d8b1520-cc7b-4c00-a775-b3843fec2161"
                      alt="shiba avatar"
                      className='object-contain w-6 h-6 sm:w-8 sm:h-8'
                    />
                  </button>
                )
            }

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
  setDropdown: PropTypes.func,
  dropdown: PropTypes.bool,
  openDropdown: PropTypes.func,
  closeDropdown: PropTypes.func,
}