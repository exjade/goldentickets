import ProptTypes from 'prop-types'
import WithdrawalHistory from './history'
//styles
import styles from '../../../styles/modules/withdrawal/withdrawal.module.css';


const AdminView = ({
    withdrawals
}) => {
    return (
        <>
            <div className='h-screen w-screen overflow-x-hidden' >
                
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