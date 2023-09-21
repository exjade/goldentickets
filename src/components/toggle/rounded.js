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
                        src='assets/casino/slots.png'
                        alt="slots"
                        className='w-8 h-8 object-contain'
                    />
                    {props?.gambling}
                </span>
            </button>
            <button
                type='button'
                onClick={() => props?.toggleLive()}
                className={`${styles.live}`}
            >
                <span className={`${styles.iconLive}`} >
                    <img
                        src='assets/casino/live.jpg'
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