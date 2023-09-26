import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/withdraw/withdraw.module.css';
import CoinNetwork from '../../coin-network/withdraw/coin-network';
import RequestLoader from '../../loader/request-loader';

const WithdrawWallet = (props) => {

    useEffect(() => {
        document.title = 'Withdraw | GOLDENTICKETS.CLUB';
    }, []); //eslint-disable-line


    const isInvalidWithdrawal = parseFloat(props.amount) <= 0 && props?.withdrawAmount <= 0 && props.withdrawAddress.length > 8 ;


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

                            <div className={`${styles.withdrawForm}`} >


                                {/* ================================== LOADERS && ERRORS MESSAGES ================================== */}
                                {
                                    props.loaderError !== '' && (
                                        <p className='font-bold text-pink-primary text-lg mb-8'>{props.loaderError}</p>
                                    )
                                }

                                {/* REQUEST LOADING */}
                                {
                                    props.loader && (
                                        <RequestLoader />
                                    )
                                }
                                {
                                    props?.withdrawalAmountError || parseInt(props?.user?.Withdrawal) < 20 || parseInt(props?.withdrawAmount) < 20 ?
                                        <p className='font-bold text-pink-primary text-sm mb-8' >{props?.withdrawalAmountError}</p> : ''
                                }
                                {/* ================================== LOADERS && ERRORS MESSAGES ================================== */}

                                <div className={`${styles.inputContainer}`} >
                                    <span className={`${styles.labelWrapper}`}>
                                        <label
                                            htmlFor='Enter your amount'
                                            className={`${styles.label}`}
                                        >
                                            amount
                                        </label>

                                        <p className={`${styles.minLabel}`}>min 20 usdt</p>
                                    </span>
                                    <input
                                        type="number"
                                        aria-label="Enter your amount"
                                        placeholder="Type amount"
                                        className={`${styles.input}`}
                                        defaultValue={props.withdrawAmount || 0}
                                        onChange={props.handleChangeAmount}
                                    />
                                </div>

                                <div className={`${styles.inputContainer}`} >
                                    <span className={`${styles.labelWrapper}`}>
                                        <label
                                            htmlFor='Enter your your address'
                                            className={`${styles.label}`}
                                        >
                                            your usdt (bep20) address
                                        </label>
                                        <p className={`${styles.minLabel}`}>address book</p>
                                    </span>
                                    <input
                                        type="text"
                                        aria-label="Enter your your address"
                                        placeholder="Type your address"
                                        className={`${styles.input}`}
                                        defaultValue={props.withdrawAddress}
                                        onChange={props.handleChangeAddress || ''}
                                    />
                                </div>

                            </div>

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
                                    className={`${styles.button} ${isInvalidWithdrawal && 'cursor-not-allowed'}`}
                                    onClick={() => props?.makeWithdrawalRequest()}
                                    disabled={isInvalidWithdrawal}
                                >
                                    Withdraw
                                </button>

                                <p>Withdrawal fee {props?.withdrawAmount <= 0 ? '0.00' : (props?.withdrawAmount * 0.05)?.toFixed(2)} USD</p>

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
    setWithdraw: PropTypes.func,
    withdraw: PropTypes.object,
    handleChange: PropTypes.func,
    handleOnsubmit: PropTypes.func,
    handleChangeAmount: PropTypes.func,
    handleChangeAddress: PropTypes.func,
    withdrawAmount: PropTypes.any,
    withdrawAddress: PropTypes.string,
    loaderError: PropTypes.string,
    loader: PropTypes.string,
    withdrawalAmountError: PropTypes.string,
    makeWithdrawalRequest: PropTypes.func,
}