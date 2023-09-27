import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/rounded.module.css';

const ToggleRounded = (props) => {
    return (
        <div className={`${styles.container}`} >

            <button
                type='button'
                onClick={() => props?.toggleGambling()}
                className={`${styles.gambling}`}
            >
                <span className={`${styles.icon}`} >
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fcasino%2Fslots.png?alt=media&token=b2ad4da4-6201-4a1c-8534-a595998282c7'
                        alt="slots"
                        className='w-8 h-8 object-contain'
                    />
                    {props?.gambling}
                </span>
            </button>
            <button
                type='button'
                onClick={() => props?.toggleLive()}
                className={`${styles.live} cursor-not-allowed`}
            >
                <span className={`${styles.iconLive}`} >
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fcasino%2Fsports.png?alt=media&token=c99c6c8c-7d93-4bb0-bbe6-5e7fc6b57a86'
                        alt="slots"
                        className='w-8 h-8 object-contain'
                    />
                        {props?.live}
                </span>
            </button>

        </div>
    )
}

export default ToggleRounded

ToggleRounded.propTypes = {
    live: PropTypes.string.isRequired,
    gambling: PropTypes.string.isRequired,
    toggleGambling: PropTypes.func,
    toggleLive: PropTypes.func,
}