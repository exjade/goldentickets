import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './../css/wallet.module.css';
import CoinNetwork from '../../coin-network/coin-network';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCodeGenerator from './QRCode';
import Lottie from 'lottie-react';
import AnimationDepositWallet from '../lottie/animation_depositWallet.json'


const DepositWallet = (props) => {

    useEffect(() => {
        document.title = 'Deposit | GOLDENTICKETS.CLUB';
    }, []); //eslint-disable-line

    const isInvalid = parseFloat(props.amount) <= 0 && props.currency === '';

    let remainingAmount = props.pay.price_amount - props.pay.amount_received + 0.5;
    let payPrice = parseFloat(props.pay.price_amount) + remainingAmount;

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
                    setGenerateQr={props.setGenerateQr}
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

                    <span className={`${styles.generateAddress}`} >


                        {
                            props.pay.price_amount > 0.99 &&
                                props.generateQr === true ? (
                                <>
                                    <div className={`${styles.qrContainer}`} >

                                        <div className="flex flex-col justify-center items-center w-full my-5 gap-2">
                                            <QRCodeGenerator data={props.pay.pay_address} />
                                            <h2 className='text-gray-text2 text-2xl font-extrabold my-2'>
                                                {
                                                    props.pay.amount_received < props.pay.price_amount ?
                                                        (
                                                            <>
                                                                {parseFloat(payPrice.toFixed(4)).toLocaleString('en-US', {
                                                                    style: 'currency',
                                                                    currency: 'USD'
                                                                })}
                                                                USD
                                                            </>
                                                        ) :
                                                        <>
                                                            {props.pay.pay_amount.toFixed(4)} <b className='uppercase ml-2'>{props.pay.pay_currency}</b>
                                                        </>
                                                }
                                            </h2>
                                        </div>

                                        <div className={`${styles.qr}`} >

                                            <div className={`flex flex-row justify-center items-center gap-2 `}>
                                                <span className='text-gray-text2'>
                                                    {
                                                        props.currency === 'usdttrc20' ?
                                                            (
                                                                <p className={`${styles.qrLabel} text-gray-text2 font-semibold`} >{`${props.coinImages.trc20.name}`} (TRC20) address</p>
                                                            ) : props.currency === 'usdtbsc' ?
                                                                (
                                                                    <p className={`${styles.qrLabel} text-gray-text2 font-semibold`} >{`${props.coinImages.bep20.name}`} (BEP20) address</p>
                                                                ) : props.currency === 'btc' ? (
                                                                    <p className={`${styles.qrLabel} text-gray-text2 font-semibold`} >{`${props.coinImages.btc.name}`} address</p>
                                                                )
                                                                    : props.currency === 'eth' ? (
                                                                        <p className={`${styles.qrLabel} text-gray-text2 font-semibold`} >{`${props.coinImages.eth.name}`} address</p>
                                                                    )
                                                                        : props.currency === 'ada' ? (
                                                                            <p className={`${styles.qrLabel} text-gray-text2 font-semibold`} >{`${props.coinImages.ada.name}`} address</p>
                                                                        )
                                                                            : props.currency === 'xrp' ? (
                                                                                <p className={`${styles.qrLabel} text-gray-text2 font-semibold`} >{`${props.coinImages.xrp.name}`} address</p>
                                                                            )
                                                                                : props.currency === 'trx' ? (
                                                                                    <p className={`${styles.qrLabel} text-gray-text2 font-semibold`} >{`${props.coinImages.trx.name}`} address</p>
                                                                                )
                                                                                    : null
                                                    }
                                                </span>

                                                {/* <p className='text-gray-text2'>- Network Fee <b>{props.pay.pay_amount - props.pay.price_amount}</b></p> */}
                                            </div>

                                            <div className={`${styles.qrButton}`}>
                                                <input
                                                    type="text"
                                                    placeholder={props.pay.pay_address}
                                                    className={`${styles.qrAddress}`}
                                                />
                                                <CopyToClipboard text={props.pay.pay_address}>
                                                    <button
                                                        type="button"
                                                        className={`${styles.qrCopy}`}
                                                        onClick={() => console.log('')}
                                                    >
                                                        Copy
                                                    </button>
                                                </CopyToClipboard>
                                            </div>
                                            <div className={`${styles.paymentWarninigNote}`} >

                                                <h3>Note:</h3>

                                                <ul className={`${styles.paymentWarning}`} >
                                                    <li>• Only send the <b className='uppercase'>{props.pay.pay_currency} ({props.pay.network})</b> to this address</li>
                                                    <li>• In some situations, your deposit address might
                                                        CHANGE so always DOUBLE CHECK if
                                                        you use the active
                                                    </li>
                                                    <li>• We currently support deposits only from <b className='uppercase'>{props.pay.pay_currency} ({props.pay.network})</b>  wallets</li>
                                                    <li>• Please do NOT deposit via cross-chain transfer</li>
                                                    <li>• in case you do NOT follow the above deposit rules, YOUR FUND WILL BE LOST</li>
                                                </ul>

                                            </div>
                                        </div>

                                    </div>
                                </>
                            ) :
                                (
                                    <>
                                        <Lottie
                                            animationData={AnimationDepositWallet}
                                            style={{
                                                width: '250px', 
                                            }}
                                        />
                                        <h2>Generate Deposit Address</h2>
                                        <p>Please generate new deposit wallet address,
                                            to enable sending funds to your account</p>

                                        {
                                            props.error && (
                                                <p className='text-md font-Nunito font-medium italic text-pink-primary text-center'>{props.error}</p>
                                            )
                                        }

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
    pay: PropTypes.any,
    error: PropTypes.string,
}