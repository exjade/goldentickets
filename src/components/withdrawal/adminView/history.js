import { useEffect } from 'react';
import PropTypes from 'prop-types';
//components
import TableWithdrawals from './table-withdrawals'
//styles
import styles from '../../../styles/modules/withdrawal/withdrawal.module.css'; //eslint-disable-line

const WithdrawalHistory = ({ withdrawals }) => {
  useEffect(() => {
    document.title = 'Withdrawal Activation | GOLDENTICKETS.CLUB '
  }, [])

  return (
    <>{
      withdrawals?.length > 0 ? (
        <>
          <TableWithdrawals
            withdrawals={withdrawals}
          />
        </>
      )

        : (
          <>
            <div className={`${styles.withdrawalHistoryNotFound} flex justify-center items-center mt-32 h-full w-full`} >
              <p className='text-4xl font-semibold text-black-btnicon '>No recent withdrawals</p>
            </div>
          </>
        )
    }
    </>
  )
}


export default WithdrawalHistory

WithdrawalHistory.propTypes = {
  withdrawals: PropTypes.array,
  WithdrawalDate: PropTypes.number
}