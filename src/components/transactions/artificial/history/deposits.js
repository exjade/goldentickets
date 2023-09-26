import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/transactions.module.css'
import { formatRelative } from 'date-fns'
import TransactionsSearchbar from '../transactions-searchbar'
import TransactionsBreadCrums from '../transactions-breadcrums'

const Deposits = ({
  setSearchTransaction,
  filteredTransactions,
  setTabs,
  tabs,
  openModal,
}) => {

    //eslint-disable-next-line no-unused-vars
    const orderByDate = filteredTransactions?.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

  return (
    <div className={`${styles.TransactionsHistorialContainer}`} >
      <div className={`${styles.TransactionsHistorialWrapper}`} >
        <div className={`${styles.TransactionsHistorialHeader} mb-16 `}>
          {/* titulo */}
          <h2 className='text-2xl font-bold hidden sm:inline text-white-normal'>
            Deposits table
          </h2>
          {/* barra de busqueda */}
          <TransactionsSearchbar
            setSearchTransaction={setSearchTransaction}
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
              <th>Date</th>
            </tr>
          </thead>
          {
            filteredTransactions?.map((value, i) => (
              <Fragment key={i}>
                <tbody className={styles.TransactionsHistorialTableBody}>
                  <tr >
                    <td data-label="Payout ID">{value.id}</td>
                    <td data-label="Currency">{value.currency}</td>
                    <td data-label="Status" className={value.status === 'NEW' ? 'text-yellow-pending' : 'text-green-amount'}>{value.status}</td>
                    <td data-label="Amount">
                      {parseFloat(value.amount).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </td>
                    <td data-label="Date">
                      {formatRelative(value.date, new Date(), { addSuffix: true })}
                    </td>
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

export default Deposits

Deposits.propTypes = {
  tabs: PropTypes.object,
  setTabs: PropTypes.func,
  setSearchTransaction: PropTypes.func,
  filteredTransactions: PropTypes.array,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
}