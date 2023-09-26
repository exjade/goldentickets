import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/withdraw/withdraw.module.css';
import CoinNetwork from '../../coin-network/withdraw/coin-network';

const WithdrawWallet = (props) => {

    useEffect(() => {
        document.title = 'Withdraw | GOLDENTICKETS.CLUB';
    }, []); //eslint-disable-line

    const isInvalid = parseFloat(props.amount) <= 0 && props.currency === '';

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

            {/* GENERATE & DISPLAY WITHDRAW ADDRESS */}

            <div className={`${styles.generateContainer}`} >
                <div className={`${styles.generateWrapper}`} >

                    <span className={`${styles.generateAddress}`}>
                        <div className={`${styles.qr}`} >
                            <div className={`${styles.paymentWarninigNote}`} >

                                <h3>Note:</h3>

                                <ul className={`${styles.paymentWarning}`} >
                                    <li>• We currently support withdraw only to <b className='uppercase'> USDT (BEP20)</b> Wallets</li>
                                    <li>• Please ensure that you do NOT input a TRC, ETH address as a USDT (TRC20)
                                        withdrawal address wallets
                                    </li>
                                    <li>• Please do NOT withdraw via cross-chain transfer</li>
                                    <li>• in case you do NOT follow the above withdrawal rules, YOUR FUND WILL BE LOST</li>
                                </ul>
                            </div>

                            <div className={`${styles.withdrawContainer}`}>

                                <button
                                    type='button'
                                    className={`${styles.button} ${isInvalid && 'cursor-not-allowed'}`}
                                    onClick={() => console.log('withdraw')}
                                    disabled={isInvalid}
                                >
                                    Withdraw
                                </button>

                            <p>Withdrawal fee  0.16876 USD</p>

                            </div>
                        </div>


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