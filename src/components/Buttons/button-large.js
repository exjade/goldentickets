import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/buttons.module.css'

const ButtonLarge = (props) => {
    return (
        <button
            type='button'
            className={`${styles.buttonLarge}`}
        >
            {props?.text}
        </button>
    )
}

export default ButtonLarge

ButtonLarge.propTypes = {
    text: PropTypes.string,
}