import React from 'react'
import styles from './css/header.module.css'
import Avatar from '../Avatar'

const Header = () => {
  return (

    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        

        <Avatar />
        
      </div>
    </div>
  )
}

export default Header