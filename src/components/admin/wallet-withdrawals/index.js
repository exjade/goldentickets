import React from 'react'
// import ProptTypes from 'prop-types'
import useWalletWithdrawals from '../../../hooks/use-walletWithdrawals';
import styles from '../../../styles/modules/withdrawal/withdrawal.module.css';
import WalletWithdrawalHistory from './history-wallet-withdrawals';


const AdminWallet = () => {

    const { withdrawals } = useWalletWithdrawals()


    return (
        <>
            <div className='h-screen w-screen overflow-x-hidden' >
                {/* <Header
                    user={user}
                    openMenu={openMenu}
                    toggleOpen={toggleOpen}
                    toggleClose={toggleClose}
                /> */}
                <div className='w-full mt-36 h-full flex flex-col gap-9'>
                    <section className={`${styles.MainWithdrawalHistory} `} >
                        <WalletWithdrawalHistory
                            withdrawals={withdrawals}
                        />
                    </section>
                </div>
            </div>
        </>
    )
}

export default AdminWallet

