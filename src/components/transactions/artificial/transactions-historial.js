import React from 'react'
import PropTypes from 'prop-types'
import Deposits from './history/deposits'
import Withdrawals from './history/withdrawals'
import WalletWithdrawal from './history/wallet-withdrawals'

const TransactionsHistorial = ({
  filteredTransactions,
  setSearchTransaction,
  setTabs,
  tabs,
  closeModal,
  openModal,
  filteredWithdrawals,
  setSearchWithdrawal,
  setSearchWalletWithdrawal,
  filteredWalletWithdrawals,
}) => {
  return (
    <>

      {
        tabs.deposits ? (
          <Deposits
            filteredTransactions={filteredTransactions}
            setSearchTransaction={setSearchTransaction}
            setTabs={setTabs}
            tabs={tabs}
            closeModal={closeModal}
            openModal={openModal}
          />
        ) : tabs.withdrawals ? (
          <Withdrawals
            filteredTransactions={filteredTransactions}
            setSearchTransaction={setSearchTransaction}
            setTabs={setTabs}
            tabs={tabs}
            closeModal={closeModal}
            openModal={openModal}
            filteredWithdrawals={filteredWithdrawals}
            setSearchWithdrawal={setSearchWithdrawal}
          />
        ) : (
          <WalletWithdrawal
            filteredTransactions={filteredTransactions}
            setSearchTransaction={setSearchTransaction}
            setTabs={setTabs}
            tabs={tabs}
            closeModal={closeModal}
            openModal={openModal}
            setSearchWalletWithdrawal={setSearchWalletWithdrawal}
            filteredWalletWithdrawals={filteredWalletWithdrawals}
          />
        )
      }

    </>
  )
}

export default TransactionsHistorial
TransactionsHistorial.propTypes = {
  deposits: PropTypes.array,
  setSearchTransaction: PropTypes.func,
  filteredTransactions: PropTypes.array,
  setTabs: PropTypes.func,
  tabs: PropTypes.object,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  filteredWithdrawals: PropTypes.array,
  setSearchWithdrawal: PropTypes.func,
  filteredWalletWithdrawals: PropTypes.array,
  setSearchWalletWithdrawal: PropTypes.func,

}