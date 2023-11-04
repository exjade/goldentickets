import React from 'react'
import PropTypes from 'prop-types'
import styles from './css/afiliados.module.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion'
import { CardSmall, CardLarge } from '../../components/Card';

const BackofficeAfiliado = ({
    user,
    code,
    sellerTickets,
    sellerComision,
    table,
}) => {
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
                        price={sellerTickets?.length}
                    />
                    <CardSmall
                        title='Comisión'
                        img={'/assets/cart-icon-28356.png'}
                        alt={'cart'}
                        price={sellerComision}
                    />
                </div>

                <CardLarge
                    content={table}
                />

            </div>
        </div >
    )
}

export default BackofficeAfiliado

BackofficeAfiliado.propTypes = {
    user: PropTypes.object,
    code: PropTypes.string,
    sellerTickets: PropTypes.array,
    sellerComision: PropTypes.number,
    table: PropTypes.object,
}