import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/card-small.module.css';

const CardSmall = ({
  title,
  img,
  alt,
  price,
}) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper}`} >
        <img
          src={img}
          alt={alt}
          className='object-contain w-16 h-16'
        />
        <div className={styles.article}>
          <p className={styles['article-name']}>{title}</p>
          <p className={styles['article-price']}>
            {parseFloat(price)?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};


export default CardSmall;

CardSmall.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  alt: PropTypes.string,
  price: PropTypes.number,
};