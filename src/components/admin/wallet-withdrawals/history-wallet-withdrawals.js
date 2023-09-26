import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/modules/withdrawal/withdrawal.module.css'; //eslint-disable-line
import TableWithdrawals from './table-wallet-withdrawals';

const WalletWithdrawalHistory = ({ withdrawals }) => {
  useEffect(() => {
    document.title = 'Admin Withdrawal Activation - Artificial'
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
              <p className='text-4xl font-semibold text-black-btnicon '>No recent wallet withdrawals</p>
            </div>
          </>
        )
    }
    </>
  )
}


export default WalletWithdrawalHistory

WalletWithdrawalHistory.propTypes = {
  withdrawals: PropTypes.array,
  WithdrawalDate: PropTypes.number
}