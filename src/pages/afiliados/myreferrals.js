import React, { useEffect, useState } from 'react'
import styles from './css/afiliados.module.css'
import useUser from '../../hooks/use-user'
import { getDailySellerCode } from '../../services/firebase'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion'

const MyReferrals = () => {

    const { user } = useUser()
    const [code, setCode] = useState('')

    useEffect(() => {
        const sellerId = user?.userId

        const result = getDailySellerCode(sellerId).then(result => {
            setCode(result[0].dailyCode)
        })
            .catch(error => {
                console.error('Error:', error);
            });
        return () => result
    }, [user])

    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`} >

                <div className={`${styles.welcomeMessage}`} >
                    <p>Bienvenido, {user?.emailAddress}</p>
                </div>

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


            </div>
        </div >
    )
}

export default MyReferrals