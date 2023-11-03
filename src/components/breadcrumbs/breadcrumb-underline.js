import React from 'react'
import PropTypes from 'prop-types'
import styles from './css/breadcrum-underline.module.css'

const BreadcrumbUnderline = ({
  crumText1,
  crumText2,
  state,
  setState,
}) => {


  return (

    <div className={`${styles['breadcrum-container']}`} >

      <button
        className={`${styles['breadcrumb-item']}`}
        type='button'
        onClick={() => setState({
          breadcrumb1: true,
          breadcrumb2: false,
        })}
      >
        <p>{crumText1}</p>
        {
          state?.breadcrumb1 && (
            <div className={styles['breadcrumb-underline']}></div>
          )
        }
      </button>

      <button
        className={`${styles['breadcrumb-item']}`}
        type='button'
        onClick={() => setState({
          breadcrumb1: false,
          breadcrumb2: true,
        })}
      >
        <p>{crumText2}</p>
        {
          state?.breadcrumb2 && (
            <div className={styles['breadcrumb-underline']}></div>
          )
        }
      </button>

    </div>


  )
}

export default BreadcrumbUnderline

BreadcrumbUnderline.propTypes = {
  crumText1: PropTypes.string,
  crumText2: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
}