import React from 'react';
import PropTypes from 'prop-types'
//styles
import styles from '../../styles/modules/withdrawal/withdrawal.module.css';
//components
import Menu from '../header/menu';
//boundary
import Error from '../../error/error';

const Header = ({ toggleOpen, toggleClose, openMenu, user }) => {
  return (
    <>
      <div className={`${styles.headerContainer}`}>
        <div className={`${styles.headerWrapper} flex flex-row justify-around`}>

          {/* BALANCE */}
          <div className={`${styles.headerBalance} cursor-default `}>
            <span className='flex flex-row gap-1'>
              <h3 className='font-extrabold text-2xl uppercase'>Withdrawals</h3>
            </span>
            <span className='flex flex-row gap-2'>
              <p className='font-light text-lg text-white-normal'>Welcome</p> <p className=' text-xl font-extrabold text-white-normal'>{user?.fullName}</p>
            </span>
          </div>
          {/* MENU */}
          <div className={`${styles.headerMenu} cursor-pointer`} onClick={!openMenu ? () => toggleOpen() : () => toggleClose()}>
            <span className="material-icons-sharp">
              menu
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col sticky top-28'>
        {
          openMenu && (
            <Error>
              <Menu
                toggleClose={toggleClose}
              />
            </Error>
          )
        }
      </div>
    </>
  )
}

export default Header

Header.propTypes = {
  toggleOpen: PropTypes.func.isRequired,
  toggleClose: PropTypes.func.isRequired,
  openMenu: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}