import React from 'react'
import PropTypes from 'prop-types';
import styles from './styles/card-large.module.css';

const CardLarge = ({
    content
}) => {
    return (
        <div className={`${styles.container}`} >
            {content}
        </div>
    )
}

export default CardLarge

CardLarge.propTypes = {
    content: PropTypes.object.isRequired,
};