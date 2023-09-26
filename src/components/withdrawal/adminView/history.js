import { useEffect } from 'react';
import PropTypes from 'prop-types';
//components
import TableWithdrawals from './table-withdrawals'
//styles
import styles from '../../../styles/modules/withdrawal/withdrawal.module.css'; //eslint-disable-line
import { useTranslation } from 'react-i18next';
const WithdrawalHistory = ({ withdrawals }) => {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = 'Admin Withdrawal Activation - Artificial '
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
              <p className='text-4xl font-semibold text-black-btnicon '>{t('No recent withdrawals')}</p>
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