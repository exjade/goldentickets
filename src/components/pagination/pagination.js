import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles/pagination.module.css'

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {

    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1);
    
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        paginate(pageNumber);
    };


    return (
        <ul className={styles['pagination-container']}>
            {pageNumbers.map((number) => (
                <li key={number} className={number === currentPage ? `${styles['pagination-active']}` : ''}>
                    <a href="#!" onClick={() => handleClick(number)}>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default Pagination

Pagination.propTypes = {
    itemsPerPage: PropTypes.number,
    totalItems: PropTypes.number,
    paginate: PropTypes.func,
}