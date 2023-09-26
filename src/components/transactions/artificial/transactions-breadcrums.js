import React from 'react';
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const TransactionsBreadCrums = ({ setTabs, tabs }) => {

    return (
        <>
            <div className='flex flex-row w-full rounded-sm'>
                <div className='flex flex-row w-full justify-between items-center h-16'>
                    <motion.button
                        type='button'
                        className={`${tabs.deposits && 'bg-gray-adminParagraph text-white-normal '} w-1/2 py-4 rounded-sm flex flex-col justify-center items-center`}
                        onClick={() => setTabs({
                            deposits: true,
                            withdrawals: false,
                            wallet: false,
                            staking: false,
                        })}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div>
                            <span className="material-symbols-sharp">
                                account_balance
                            </span>
                            <p className={`${tabs.deposits ? 'text-white-normal' : 'hidden'} text-md font-medium`}>Deposits</p>
                        </div>
                    </motion.button>

                    <motion.button
                        type='button'
                        className={`${tabs.withdrawals && 'bg-gray-adminParagraph text-white-normal  '} w-1/2 py-4 rounded-sm flex flex-col justify-center items-center`}
                        onClick={() => setTabs({
                            deposits: false,
                            withdrawals: true,
                            wallet: false,
                            staking: false,
                        })}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div>
                            <span className="material-symbols-sharp">
                                currency_exchange
                            </span>
                            <p className={`${tabs.withdrawals ? 'text-white-normal' : 'hidden'} text-md font-medium`}>Withdrawals</p>
                        </div>

                    </motion.button>

                    <motion.button
                        type='button'
                        className={`${tabs.wallet && 'bg-gray-adminParagraph text-white-normal  '} w-1/2 py-4 rounded-sm flex flex-col justify-center items-center`}
                        onClick={() => setTabs({
                            deposits: false,
                            withdrawals: false,
                            wallet: true,
                            staking: false,
                        })}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div>
                            <span className="material-symbols-sharp">
                                wallet
                            </span>
                            <p className={`${tabs.wallet ? 'text-white-normal' : 'hidden'} text-md font-medium `}>Wallet</p>
                        </div>
                    </motion.button>
                </div>
            </div>
        </>
    );
};
export default TransactionsBreadCrums;
TransactionsBreadCrums.propTypes = {
    setTabs: PropTypes.func,
    tabs: PropTypes.object,
}