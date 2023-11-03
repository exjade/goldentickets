import React, { useEffect, useState } from 'react'
import styles from './css/afiliados.module.css'
import useUser from '../../hooks/use-user'
import { getDailySellerCode } from '../../services/firebase'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion'
import useWeeklyTickets from '../../hooks/draw/weekly-prize/use-weeklyTickets';
import { formatRelative } from 'date-fns'
import FallBackLoader from '../../components/FallBackLoader';
import { CardSmall } from '../../components/Card';

const AffiliatesTimeline = () => {

    const { user } = useUser()
    const { tickets: weeklyTickets } = useWeeklyTickets()
    const [code, setCode] = useState('')
    const [loader, setLoader] = useState(false)



    useEffect(() => {
        const sellerId = user?.userId

        const result = getDailySellerCode(sellerId).then(result => {
            if (result === undefined) {
                setLoader(true)
            } else {
                setCode(result[0].dailyCode)
            }
        }).catch(error => {
            console.error('Error:', error);
        });


        setTimeout(() => {
            setLoader(false)
        }, [1000])

        return () => result
    }, [user])

    const filterTicketsWithSellerCode = weeklyTickets?.filter(ticket => ticket.sellerCode === code)

    if (loader) {
        return <FallBackLoader />
    }
    else {
        return (
            <div className={`${styles.container}`} >
                <div className={`${styles.wrapper}`} >

                    <div className={`${styles.welcomeMessage}`} >
                        <p>Bienvenido, {user?.emailAddress}</p>
                    </div>

                    {/* SELLER CODE */}
                    <div className={`${styles.sellerCode}`} >
                        {
                            code === undefined || code === '' ?
                                (
                                    <p>Código: loading... </p>
                                ) :
                                (
                                    <>
                                        <p>Tú código de venta:</p>
                                        < CopyToClipboard text={code}>
                                            <motion.button
                                                type='button'
                                                className={`${styles.referralCode} lowercase font-semibold`}
                                                whileTap={{ scale: 0.9 }}>
                                                {code}
                                            </motion.button>
                                        </CopyToClipboard>
                                    </>
                                )
                        }
                    </div>

                    {/* CARDS */}
                    <div className={styles['grid-container']}>
                        <CardSmall
                            title='Tickets'
                            img={'https://i.pinimg.com/originals/b6/6b/c2/b66bc2adbaa9662e647ac3f7dbff704b.png'}
                            alt={'ticket'}
                            price={'128'}
                        />
                        <CardSmall
                            title='Comisión'
                            img={'/assets/cart-icon-28356.png'}
                            alt={'cart'}
                            price={128}
                        />
                    </div>

                    {/* TICKETS */}
                    <div className={`${styles.WrapperTickets}`} >
                        <div className={`${styles.ticket}`} >

                            {
                                filterTicketsWithSellerCode?.map((ticket, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.table}`}
                                    >
                                        <p>code: {ticket.sellerCode}</p>
                                        <p>costo: {ticket.costoTicket} USD</p>
                                        <p>numero: {ticket.numeroTicket}</p>
                                        <p>Loteria: {ticket.drawType}</p>
                                        <p>Fecha:  {formatRelative(ticket.purchaseDate, new Date(), { addSuffix: true })}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>





                </div>
            </div >
        )
    }
}

export default AffiliatesTimeline