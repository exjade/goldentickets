import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import styles from './css/dropdown.module.css';
import FirebaseContext from '../../../context/firebase';

const DropDownUserHeader = (props) => {

  const { firebase } = useContext(FirebaseContext);

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
          <p>exjade</p>
        </div>

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