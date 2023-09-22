import React from 'react'
import styles from './css/logo.module.css';

const Logo = () => {

    const logo = `${process.env.REACT_APP_LOGO}`;

    return (

        <>
            {/* MENU */}
            <div className={`${styles.menu}`}>
                <div className={`${styles.brand}`} >
                    <img
                        src={logo}
                        alt="logo"
                        className={`${styles.img}`}
                    />
                    <p className={`${styles.font} text-white-normal uppercase hidden sm:inline`}>GoldenTickets</p>
                </div>

            </div>
        </>

    )
}

export default Logo