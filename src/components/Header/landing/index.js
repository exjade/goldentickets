import React from 'react';
import styles from './css/header.module.css';
import ToggleRounded from '../../toggle/rounded';
import ButtonMid from '../../Buttons/button-mid';
import ButtonLarge from '../../Buttons/button-large';
import * as ROUTES from '../../../constants/routes';
import { Link } from 'react-router-dom'

const Header = () => {

  const logo = 'https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fog%2Flogo.png?alt=media&token=e6e2fb27-e8ce-4066-9b5c-b52a816414e6';

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

          <Link to={ROUTES.LANDING}>
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
            live={`live`}
          />
        </div>



        {/* BALANCE & WALLET */}
        <div className={`${styles.auth}`} >
          <Link to={ROUTES.LOGIN}>
            <ButtonMid
              text={`Login`}
            />
          </Link>
          <Link to={ROUTES.SIGNUP}>
            <ButtonLarge
              text={`Register`}
            />
          </Link>
        </div>

        {/* USER PROFILE */}

      </div>
    </header>
  )
}

export default Header