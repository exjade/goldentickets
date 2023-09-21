import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/buttons.module.css'

const ButtonMid = (props) => {
    return (
        <button
            type='button'
            onClick={() => props?.handleFunction()}
            className={`${styles.buttonMid}`}
        >
            {props?.text}
        </button>
    )
}

export default ButtonMid

ButtonMid.propTypes = {
    handleFunction: PropTypes.func,
    text: PropTypes.string,
}