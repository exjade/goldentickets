import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/searchbar.module.css'

const Searchbar = ({
  title,
}) => {
  return (
    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        <div className={`${styles.title}`} >
          <h3>{title}</h3>
        </div>
        <div className={`${styles.searchbar}`} >
          <input
            type="search"
            name="searchbar"
            id="searchbar"
            placeholder='Search' 
            className='w-full mx-4 py-1 text-center outline-none'
            />
        </div>

      </div>
    </div>
  )
}

export default Searchbar

Searchbar.propTypes = {
  title: PropTypes.string,
}