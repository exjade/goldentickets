import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../../styles/modules/transactions/loader.module.css'


const TransactionsLoader = () => {

const {t} = useTranslation()
    return (
        <>

            <div className={`${styles.container} `}>
                <div className={`${styles.floor} `} >
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={`${styles.coin} animate-bounce`}>
                    <div className={`${styles.edge} `}>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                        <div className={styles.segment}></div>
                    </div>
                </div>
                <div>
                    <p className='mt-10 text-lg text-black-normal font-bold'>{t('Please_wait_a_few_seconds,_we_are_loading_recently_transactions')}</p>
                </div>
            </div>
        </>
    )
}

export default TransactionsLoader