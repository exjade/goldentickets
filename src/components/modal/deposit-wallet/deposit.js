import React from 'react';
import PropTypes from 'prop-types';
import styles from './../css/wallet.module.css';
import CoinNetwork from '../../coin-network/coin-network';

const DepositWallet = (props) => {


    const isInvalid = parseFloat(props.amount) <= 0 && props.currency === '';

    return (
        <>
            {/* DEPOSIT - DEPOSIT HISTORY */}
            <div className={`${styles.depositContainer}`} >
                <span className={`${styles.depositWrapper}`} >
                    <h4>deposit</h4>
                    <p>Deposit History</p>
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
                />
            </div>

            <div className={`${styles.divider}`}></div>

            {/* GENERATE & DISPLAY DEPOSIT ADDRESS */}

            <div className={`${styles.generateContainer}`} >
                <div className={`${styles.generateWrapper}`} >

                    <span className={`${styles.generateAddress}`}>

                        {
                            props.pay.amount_received > 1 &&
                                props.generateQr === true ? (
                                <>GENERAR QR</>
                            ) :
                                (
                                    <>
                                        <img
                                            src="assets/blockchain/address_icon.png"
                                            alt="network"
                                            className={`${styles.addressIcon} w-24 h-24 object-contain`}
                                        />
                                        <h2>Generate Deposit Address</h2>
                                        <p>Please generate new deposit wallet address,
                                            to enable sending funds to your account</p>

                                        <button
                                            type='button'
                                            className={`${styles.button} ${isInvalid && 'cursor-not-allowed'}`}
                                            onClick={() => props.setGenerateQr(true)}
                                            disabled={isInvalid}
                                        >
                                            Generate
                                        </button>
                                    </>
                                )
                        }


                    </span>
                </div>
            </div>
        </>
    )
}

export default DepositWallet

DepositWallet.propTypes = {
    currency: PropTypes.string,
    setCurrency: PropTypes.func,
    coinImages: PropTypes.object,
    amount: PropTypes.any,
    setAmount: PropTypes.func,
    setGenerateQr: PropTypes.func,
    generateQr: PropTypes.bool,
    pay: PropTypes.array,
}