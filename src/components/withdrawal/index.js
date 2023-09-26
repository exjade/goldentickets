import React from 'react'
//custom hooks
import useMenu from '../../hooks/use-menu'
import useUser from '../../hooks/use-user'
import useWithdrawals from '../../hooks/use-withdrawals'
//components
import AdminView from './adminView'
//eslint-disable-next-line
import styles from '../../styles/modules/withdrawal/withdrawal.module.css';
//firebase


const WithdrawalTimeline = () => {

    const { user,
        user: {
            rol,
        } } = useUser()
    const { openMenu, toggleOpen, toggleClose } = useMenu()
    const { withdrawals } = useWithdrawals()
    //eslint-disable-next-line no-unused-vars
    const orderByDate = withdrawals.sort((a, b) => {
        return new Date(b.WithdrawalDate) - new Date(a.WithdrawalDate)
    })
  


    return (
        <>
            {
                rol === 'admin' || rol === 'owner' && rol !== 'Member' && rol !== 'guest' ? (
                    <>
                        <AdminView
                            user={user}
                            openMenu={openMenu}
                            toggleOpen={toggleOpen}
                            toggleClose={toggleClose}
                            withdrawals={withdrawals}
                        />
                    </>
                ) : null
            }
        </>
    )
}

export default WithdrawalTimeline