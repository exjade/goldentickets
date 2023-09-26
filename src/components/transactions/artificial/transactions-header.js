import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles/transactions.module.css'
import  * as ROUTES from '../../../constants/routes'

const TransactionsHeader = (props) => {

    const [date, setDate] = useState('')
    const getDate = () => {
        const date = new Date();

        // Obtener el nombre del mes
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const actualMonth = months[date.getMonth()];

        // Obtener el número del día
        const today = date.getDate();

        // Formatear la fecha en el formato deseado
        const dateToday = 'Today, ' + actualMonth + ' ' + today + ', ' + date.getFullYear();
        setDate(dateToday);
    }

    useEffect(() => { return getDate() }, [])


    return (
        <div className={`${styles.transactionsHeaderContainer}`} >
            <div className={`${styles.transactionsHeaderWrapper}`}>
                <a href={ROUTES.DASHBOARD}>
                    <img
                        src='/logo.webp'
                        alt='website logo'
                        className='w-12 h-12 object-cover rounded-full'
                    />
                </a>
                {/* title */}
                <p className='text-xl font-light'>{date}</p>
                {/* profile */}
                <div className={styles.transactionsHeader}>
                    {props.user.photoURL === '' ?
                        <div className='h-12 w-12 rounded-full bg-gray-loader animate-pulse'></div>
                        :
                        <img src={`${props.user.photoURL}`} alt="user profile" />
                    }
                    <p className='font-medium text-xl capitalize text-black-normal'>{props.user.username}</p>
                </div>
            </div>
        </div>
    )
}

export default TransactionsHeader

TransactionsHeader.propTypes = {
    user: PropTypes.object,
}