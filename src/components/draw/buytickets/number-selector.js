import React from 'react';
import PropTypes from 'prop-types'
import styles from './css/buytickets.module.css'

function NumberSelector({ number, isSelected, onClick }) {
    const handleClick = () => {
        onClick(number);
    };

    return (
        <span
            className={`${isSelected ? `${styles.middleCircleSelected} text-yellow-pending` : `${styles.middleCircle} text-white-normal`} cursor-pointer`}
            onClick={handleClick}
        >
            {number}
        </span>
    );
}

export default NumberSelector;

NumberSelector.propTypes = {
    number: PropTypes.number,
    isSelected: PropTypes.any,
    onClick: PropTypes.func,
}