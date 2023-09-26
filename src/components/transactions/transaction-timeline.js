import React, { useState, useRef, useEffect } from 'react'
//Proptypes
import PropTypes from 'prop-types'
//components
import styles from '../../styles/modules/transactions/transactions.module.css'
//styles
import '../../styles/sidebar/sidebar.css'
//error
import Error from '../../error/error'
import useUser from '../../hooks/use-user'
import TransactionsAdmin from './admin-artificial/table'
import useDeposits from '../../hooks/use-deposits'
import useAdminDeposits from '../../hooks/use-adminDeposits'
import FallBackLoader from '../FallBackLoader'
// firebase
import { firebase } from '../../lib/firebase'
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from 'firebase/firestore'
const firestore = getFirestore(firebase)

const TransactionTimeline = () => {

  const { user: { userId, username, rol } } = useUser()
  const { deposits } = useDeposits()
  const { deposits: AllDeposits } = useAdminDeposits()
  const [transactionSearch, setTransactionSearch] = useState('')
  const tableRef = useRef(null);
  const isInvalid = 0;

  const [customerId, setCustomerId] = useState(null)
  const [customerCode, setCustomerCode] = useState(null)
  const [customerName, setCustomerName] = useState(null)
  const [customerAmount, setCustomerAmount] = useState(null)
  const [customerCurrency, setCustomerCurrency] = useState(null)
  const [success, setSuccess] = useState('')

  const [select, setSelect] = useState({
    packageName: 'TETHER',
    packagePrice: 0,
    packageStatus: '',
  })

  // MODAL
  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  //eslint-disable-next-line no-unused-vars
  const completedTransactions = deposits?.filter(transaction => transaction.amount > 0)
  const transactionsInPlatform = AllDeposits?.filter(transaction => transaction.amount > 0)

  const filterTransactions = transactionsInPlatform?.filter((search) =>
    search.id?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.status?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.currency?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.username?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.userId?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.depositBalance[0]?.payment_id?.toLowerCase().includes(transactionSearch.toLowerCase())
  )

  //eslint-disable-next-line no-unused-vars
  const orderByDate = filterTransactions?.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const updateBalance = async () => {
    try {
      // Create a new log 
      await setDoc(doc(firestore, 'logsActivation', customerCode?.substring(0, 8)), {
        transactionCode: customerCode,
        customerId: customerId,
        customerName: customerName,
        packageName: select.packageName,
        packagePrice: select.packagePrice,
        adminID: userId,
        adminName: username,
      })
      // Update the user information
      const customerRef = doc(firestore, 'users', customerId);
      const docSnap = await getDoc(customerRef)
      const docRef = doc(firestore, 'users', customerId)

      // Update user balance information
      if (select.packageName === 'TETHER') {
        await updateDoc(docRef, {
          Balance: parseFloat(select.packagePrice) + docSnap.data().Balance,
          BalanceDate: Date.now(),
        })
      }

      const dRef = doc(firestore, 'deposits', customerCode);
      await updateDoc(dRef, {
        status: 'COMPLETED',
      })


      setSuccess('Se ha actualizado el saldo correctamente')
      setTimeout(() => {
        setSuccess('')
        setCustomerId(null)
        setCustomerCode(null)
        setCustomerName(null)
        setCustomerAmount(null)
        setCustomerCurrency(null)
        setSelect({
          packageName: 'TETHER',
          packagePrice: 0,
          packageStatus: '',
        })
        setModal(false)
      }, 3500)

    } catch (error) {
      console.log(error, 'no document to update')
    }
  }


  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

  }, [])

  const loaderTransactions = () => { return <FallBackLoader /> }

  if (isLoading) return loaderTransactions();
  else {
    return (
      <div className={`${styles.main}`}  >

        <section className={`${styles.section} container`}  >
          <Error>
            <TransactionsAdmin
              rol={rol}
              transactionSearch={transactionSearch}
              setTransactionSearch={setTransactionSearch}
              setCustomerId={setCustomerId}
              setCustomerCode={setCustomerCode}
              setCustomerName={setCustomerName}
              setCustomerAmount={setCustomerAmount}
              setCustomerCurrency={setCustomerCurrency}
              success={success}
              customerId={customerId}
              customerCode={customerCode}
              customerName={customerName}
              customerAmount={customerAmount}
              customerCurrency={customerCurrency}
              username={username}
              modal={modal}
              openModal={openModal}
              closeModal={closeModal}
              tableRef={tableRef}
              isInvalid={isInvalid}
              filterTransactions={filterTransactions}
              setSelect={setSelect}
              select={select}
              transactionsInPlatform={transactionsInPlatform}
              updateBalance={updateBalance}
            />
          </Error>
        </section>
      </div>
    )
  }
}

export default TransactionTimeline

TransactionTimeline.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  transactionSearch: PropTypes.string,
  setTransactionSearch: PropTypes.func
}