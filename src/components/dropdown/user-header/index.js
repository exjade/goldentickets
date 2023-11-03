import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import styles from './css/dropdown.module.css';
import FirebaseContext from '../../../context/firebase';
import { motion } from 'framer-motion'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useUser from '../../../hooks/use-user';
import * as ROUTES from '../../../constants/routes'

const DropDownUserHeader = (props) => {

  const { firebase } = useContext(FirebaseContext);
  const { user } = useUser();

  return (
    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >


        {/* USER PROFILE & Chat */}
        <div className={`${styles.profile}`} >
          <button
            type='button'
            className={`${styles.circles}`}
            onClick={() => props.setDropdown(false)}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fcasino%2Fprofile_shiba_inu.png?alt=media&token=8d8b1520-cc7b-4c00-a775-b3843fec2161"
              alt="shiba avatar"
              className='object-contain w-6 h-6 sm:w-8 sm:h-8'
            />
          </button>
          <p>{user?.username}</p>
        </div>

        {
          user?.rol === 'afiliado' ? (
            <>
              <div className={`${styles.divider}`}></div>

              <Link to={ROUTES.AFILIATE} className='w-full'>
                <div className='flex flex-row justify-center items-center gap-5 bg-gray-loader text w-full rounded-md h-8'>
                  <span className="material-symbols-outlined text-white-normal w-4 h-4 text-md flex justify-center items-center">
                    arrow_forward
                  </span>
                  <p className='text-white-normal uppercase '>
                    Backoffice
                  </p>
                </div>
              </Link>

              {/* Referral code*/}
              <CopyToClipboard text={user?.referral?.referralCode}>
                <motion.button
                  type='button'
                  className={`${styles.referralCode} lowercase font-semibold text-sm flex justify-center items-center gap-4`}
                  whileTap={{ scale: 0.9 }}>
                  <span className="material-symbols-outlined text-sm">
                    content_copy
                  </span>
                  {user?.referral?.referralCode}
                </motion.button>
              </CopyToClipboard>

            </>
          ) : user?.rol === 'admin' ? (
            <>
              <div className={`${styles.divider}`}></div>

              <Link to={ROUTES.AFILIATE} className='w-full'>
                <div className='flex flex-row justify-center items-center gap-5 bg-gray-loader text w-full rounded-md h-8'>
                  <span className="material-symbols-outlined text-white-normal w-4 h-4 text-md flex justify-center items-center">
                    arrow_forward
                  </span>
                  <p className='text-white-normal uppercase '>
                    Backoffice
                  </p>
                </div>
              </Link>

              {/* Referral code*/}
              <CopyToClipboard text={user?.referral?.referralCode}>
                <motion.button
                  type='button'
                  className={`${styles.referralCode} lowercase font-semibold text-sm flex justify-center items-center gap-4`}
                  whileTap={{ scale: 0.9 }}>
                  <span className="material-symbols-outlined text-sm">
                    content_copy
                  </span>
                  {user?.referral?.referralCode}
                </motion.button>
              </CopyToClipboard>

            </>
          ) : null
        }

        <div className={`${styles.divider}`}></div>

        <button
          type="button"
          onClick={() => {
            firebase.auth().signOut()
            setTimeout(() => { window.location.reload() }, 50)
          }

          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              firebase.auth().signOut()
            }
          }}
          className={`${styles.logOutButton}`}
        >
          <span className="material-symbols-outlined text-gray-logout">
            logout
          </span>
          <p>Logout</p>
        </button>

      </div>
    </div>
  )
}

export default DropDownUserHeader

DropDownUserHeader.propTypes = {
  setDropdown: PropTypes.func,
}