import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/searchbar.module.css'

const Searchbar = ({
  title,
  setSearch,
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
            onChange={e => setSearch(e.target.value)}
            />
        </div>

      </div>
    </div>
  )
}

export default Searchbar

Searchbar.propTypes = {
  title: PropTypes.string,
  setSearch: PropTypes.func,
}