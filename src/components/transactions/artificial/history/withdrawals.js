import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/transactions.module.css'
import { formatRelative } from 'date-fns'
import TransactionsSearchbar from '../withdrawals-searchbar'
import TransactionsBreadCrums from '../transactions-breadcrums'

const Withdrawals = ({
  setTabs,
  tabs,
  openModal,
  filteredWithdrawals,
  setSearchWithdrawal,
}) => {
  //eslint-disable-next-line no-unused-vars
  const orderByDate = filteredWithdrawals?.sort((a, b) => {
    return new Date(b.WithdrawalDate) - new Date(a.WithdrawalDate)
  })


  return (
    <div className={`${styles.TransactionsHistorialContainer}`} >
      <div className={`${styles.TransactionsHistorialWrapper}`} >



        <div className={`${styles.TransactionsHistorialHeader} mb-16 `}>
          {/* titulo */}
          <h2 className='text-2xl font-bold hidden sm:inline text-white-normal'>
            Payout table
          </h2>
          {/* barra de busqueda */}
          <TransactionsSearchbar
            setSearchWithdrawal={setSearchWithdrawal}
          />
          {/* botón de payout */}
          <button
            type='button'
            className={`${styles.TransactionsHistorialPayout}`}
            onClick={() => openModal()}
          >
            Payout
          </button>
        </div>

        <TransactionsBreadCrums
          setTabs={setTabs}
          tabs={tabs}
        />

        {/* Tabla de datos */}
        <table className={`${styles.TransactionsHistorialTable}`} >
          <thead className={`${styles.TransactionsHistorialTableTitle}`}>
            <tr className={`${styles.TransactionsHistorialTableTitle}`}>
              <th>Payout ID</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Fee</th>
              <th>Date</th>
              <th>Tronscan</th>
            </tr>
          </thead>
          {
            filteredWithdrawals?.map((value, i) => (
              <Fragment key={i}>
                <tbody className={styles.TransactionsHistorialTableBody}>
                  <tr >
                    <td data-label="Payout ID">{value.WithdrawalId}</td>
                    <td data-label="Currency">{value.WithdrawalInformation.tether.BankName}</td>
                    <td data-label="Status" className={value.WithdrawalStatus === 'Pending' ? 'text-yellow-pending' : 'text-green-amount'}>
                      {value.WithdrawalStatus}
                    </td>
                    <td data-label="Amount">
                      {parseFloat(value.WithdrawalAmount).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </td>
                    <td data-label="Fee">
                      {parseFloat(value.WithdrawalFee).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </td>
                    <td data-label="Date">
                      {formatRelative(value.WithdrawalDate, new Date(), { addSuffix: true })}
                    </td>
                    {
                      value.WithdrawalURL !== '' ?
                        (
                          <a href={value.WithdrawalURL}
                            className='flex flex-col justify-center items-center my-4 text-artificial-text-card-primary'
                            target='_blank'
                            rel="noreferrer">
                            <span className="material-symbols-sharp">
                              visibility
                            </span>
                          </a>
                        )
                        : (
                          <a href={value.WithdrawalURL}
                            className='flex flex-col justify-center items-center my-4 text-red-warning'
                            target='_blank'
                            rel="noreferrer">
                            <span className="material-symbols-sharp">
                              visibility_off
                            </span>
                          </a>
                        )
                    }

                  </tr>
                </tbody>
              </Fragment>
            ))
          }
        </table>
      </div>
    </div>
  )
}

export default Withdrawals

Withdrawals.propTypes = {
  tabs: PropTypes.object,
  setTabs: PropTypes.func,
  setSearchTransaction: PropTypes.func,
  filteredTransactions: PropTypes.array,
  openModal: PropTypes.func,
  filteredWithdrawals: PropTypes.array,
  setSearchWithdrawal: PropTypes.func,
}