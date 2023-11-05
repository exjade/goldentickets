import React from 'react'
import PropTypes from 'prop-types'
import styles from './css/afiliados.module.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion'
import { CardSmall, CardLarge } from '../../components/Card';

const BackofficeAdmin = ({
    user,
    code,
    AllTickets,
    Afiliados,
    sellerComision,
    ingresoNeto,
    ingresoBruto,
    table,
    generateSellerCode,
    messageSuccessful,
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
                                <>
                                    {
                                        messageSuccessful && (
                                            <p className='text-green-secondary text-center'>{messageSuccessful}</p>
                                        )
                                    }
                                    <button
                                        type='button'
                                        onClick={generateSellerCode}
                                        className='bg-blue-createAccount px-10 text-center py-4 rounded-md text-white-normal'
                                    >
                                        Generar Código
                                    </button>
                                </>
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
                        price={AllTickets?.length}
                    />
                    <CardSmall
                        title='Afiliados'
                        img={'https://cdn-icons-png.flaticon.com/512/950/950974.png'}
                        alt={'ticket'}
                        price={Afiliados}
                    />
                    <CardSmall
                        title='Comisiones'
                        img={'https://png.pngtree.com/png-vector/20220724/ourmid/pngtree-financial-loss-icon-flame-money-financial-vector-png-image_38128564.png'}
                        alt={'cart'}
                        price={sellerComision}
                    />
                    <CardSmall
                        title='Ingreso bruto'
                        img={'https://www.svgrepo.com/show/6268/money.svg'}
                        alt={'cart'}
                        price={ingresoBruto}
                    />
                    <CardSmall
                        title='Ingreso Neto'
                        img={'https://www.svgrepo.com/show/113946/profit.svg'}
                        alt={'cart'}
                        price={ingresoNeto}
                    />
                </div>

                <CardLarge
                    content={table}
                />

            </div>
        </div >
    )
}

export default BackofficeAdmin

BackofficeAdmin.propTypes = {
    user: PropTypes.object,
    code: PropTypes.string,
    AllTickets: PropTypes.array,
    Afiliados: PropTypes.number,
    sellerComision: PropTypes.number,
    ingresoNeto: PropTypes.number,
    ingresoBruto: PropTypes.number,
    table: PropTypes.object,
    generateSellerCode: PropTypes.func,
    messageSuccessful: PropTypes.string,
}