import ProptTypes from 'prop-types'
import Header from './header'
import WithdrawalHistory from './history'
//styles
import styles from '../../../styles/modules/withdrawal/withdrawal.module.css';


const AdminView = ({
    user,
    openMenu,
    toggleOpen,
    toggleClose,
    withdrawals
}) => {
    return (
        <>
            <div className='h-screen w-screen overflow-x-hidden' >
                <Header
                    user={user}
                    openMenu={openMenu}
                    toggleOpen={toggleOpen}
                    toggleClose={toggleClose}
                />
                <div className='w-full mt-36 h-full flex flex-col gap-9'>
                    <section className={`${styles.MainWithdrawalHistory} `} >
                        <WithdrawalHistory
                            withdrawals={withdrawals}
                        />
                    </section>
                </div>
            </div>
        </>
    )
}

export default AdminView

AdminView.propTypes = {
    user: ProptTypes.object.isRequired,
    openMenu: ProptTypes.bool.isRequired,
    toggleOpen: ProptTypes.func.isRequired,
    toggleClose: ProptTypes.func.isRequired,
    withdrawals: ProptTypes.array.isRequired
}