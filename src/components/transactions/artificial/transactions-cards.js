import React from 'react'
import PropTypes from 'prop-types';
import styles from './styles/transactions.module.css'

const TransactionsCards = (props) => {

    const arrayValues = props.staking?.map(v => Number(v.initialInvestment))
    const sumValues = arrayValues?.reduce(function (a, b) {
        return a + b
    }, 0)


    return (
        <div className={`${styles.transactionsCardsContainer} font-Inter-600`} >
            {/* <span>
                <h1>Balances</h1>
            </span> */}
            <div className={`${styles.transactionsCardsWrapper}`} >
                {/* Staking Balance */}
                <div className={`${styles.transactionsCards}`}>

                    <div className={`${styles.transactionsCardsStaking}`} >
                        <span className={`${styles.transactionsCardsStakingText}`} >
                            <p className={`${styles.staking1}  text-lg capitalize font-medium`} >Funds on staking</p>
                            <p className={`${styles.staking2}  font-bold text-2xl`} >
                                {parseFloat(sumValues).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                            <img
                                src="/assets/graph.png"
                                alt="graph"
                                className='w-44 h-16 object-contain'
                            />
                        </span>
                    </div>
                    {/* Investment Balance */}
                    <div className={`${styles.transactionsCardsBalance}`} >
                        <span >
                            <p className='text-lg capitalize font-medium text-white-normal' >Wallet Balance</p>
                            <p className='font-bold text-2xl text-white-normal'>
                                {parseFloat(props.user.topupBalance).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </span>
                        <span>
                            <img
                                src="/assets/balance-img.png"
                                alt="graph"
                                className='w-44 h-28 object-contain'
                            />
                        </span>
                    </div>
                    {/* Withdrawal Balance */}
                    <div className={`${styles.transactionsCardWithdrawal}`} >
                        <span >
                            <p className={`${styles.withdrawal1}  text-lg font-medium text-white-normal`} >Available Funds</p>
                            <p className={`${styles.withdrawal2}  font-bold text-2xl text-white-normal`} >
                                {parseFloat(props.user.Withdrawal).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>

                        </span>
                        <span>
                            <img
                                src="/assets/w-img.png"
                                alt="graph"
                                className='w-44 h-28 object-contain'
                            />
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TransactionsCards

TransactionsCards.propTypes = {
    user: PropTypes.object,
    staking: PropTypes.any,
}