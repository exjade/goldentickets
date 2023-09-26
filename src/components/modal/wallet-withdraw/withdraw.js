import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/wallet.module.css';
import CoinNetwork from '../../coin-network/withdraw/coin-network';

const WithdrawWallet = (props) => {

    useEffect(() => {
        document.title = 'Withdraw | GOLDENTICKETS.CLUB';
    }, []); //eslint-disable-line

    return (
        <>
            {/* DEPOSIT - DEPOSIT HISTORY */}
            <div className={`${styles.depositContainer}`} >
                <span className={`${styles.depositWrapper}`} >
                    <h4>Withdraw</h4>
                    <p>Withdraw History</p>
                </span>
            </div>

            <div className={`${styles.divider}`}></div>

            {/* SELECT COIN & NETWORK */}
            <div className={`${styles.coinNetworkContainer}`} >
                <CoinNetwork
                    setCurrency={props.setCurrency}
                    currency={props.currency}
                    coinImages={props.coinImages}
                    setAmount={props.setAmount}
                    amount={props.amount}
                    user={props.user}
                />
            </div>

            <div className={`${styles.divider}`}></div>

            {/* GENERATE & DISPLAY DEPOSIT ADDRESS */}

            <div className={`${styles.generateContainer}`} >
                <div className={`${styles.generateWrapper}`} >

                    <span className={`${styles.generateAddress}`}>



                    </span>
                </div>
            </div>
        </>
    )
}

export default WithdrawWallet

WithdrawWallet.propTypes = {
    setCurrency: PropTypes.func,
    setAmount: PropTypes.func,
    currency: PropTypes.string,
    coinImages: PropTypes.object,
    amount: PropTypes.number,
    user: PropTypes.object,

}