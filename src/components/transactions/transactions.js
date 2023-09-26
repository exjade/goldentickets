import React, { useState, memo, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import FallBackLoader from '../FallBackLoader';
import { formatRelative } from 'date-fns'
import { DownloadTableExcel } from 'react-export-table-to-excel';
//styles
import styles from '../../styles/modules/transactions/transactions.module.css'
//hooks
import useUser from '../../hooks/use-user'
import useUsers from '../../hooks/use-users';
import useInvestments from '../../hooks/use-investments'
// firebase
import { firebase } from '../../lib/firebase'
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Transactions = ({
  transactionSearch,
  setTransactionSearch
}) => {
  const { investmentsUsers } = useInvestments()
  const { user: { userId, username, rol, activePackages } } = useUser()
  const clientTransactions = investmentsUsers?.filter(transaction => transaction.userId === userId)
  const tableRef = useRef(null);

  const packages = {
    package250: '$250.00',
    package500: '$500.00',
    package750: '$750.00',
    package900: '$900',
    package1000: '$1,000',
    package3000: '$3,000.00',
    package5000: '$5,000.00',
    package10000: '$10,000.00',
    package20000: '$20,000.00',
    package50000: '$50,000.00',
  }

  //eslint-disable-next-line no-unused-vars
  const orderByDate = investmentsUsers?.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const completedTransactions = investmentsUsers?.filter(transaction => transaction.amount > 0)

  const filterTransactions = completedTransactions?.filter(search =>
    search.id?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.userId?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.status?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.currency?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.username?.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.customNowpayments?.paymentId?.toString().toLowerCase().includes(transactionSearch.toLowerCase()) ||
    search.nowpayments?.paymentId?.toString().toLowerCase().includes(transactionSearch.toLowerCase())
  )

  // MODAL
  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const [select, setSelect] = useState({
    packageName: 'TETHER',
    packagePrice: 0,
    packageStatus: '',
  })
  const isInvalid = select.packageName === '' || select.packagePrice === 0;
  //UPDATE PACKAGES
  const [customerId, setCustomerId] = useState(null)
  const [customerCode, setCustomerCode] = useState(null)
  const [customerName, setCustomerName] = useState(null)
  const [customerAmount, setCustomerAmount] = useState(null)
  const [customerCurrency, setCustomerCurrency] = useState(null)
  const [success, setSuccess] = useState('')

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
          Applied: parseFloat(select.packagePrice) + parseFloat(docSnap.data().Applied),
          AppliedDate: Date.now(),
        })
      }

      // Update user active packages information
      if (!docSnap?.data()?.activePackages?.includes(select.packageName)) {
        await updateDoc(docRef, {
          activePackages:
            customerAmount === 250 ?
              [...activePackages, packages.package250] :
              customerAmount === 500 ?
                [...activePackages, packages.package500] :
                customerAmount === 750 ?
                  [...activePackages, packages.package750] :
                  customerAmount === 900 ?
                    [...activePackages, packages.package900] :
                    customerAmount === 1000 ?
                      [...activePackages, packages.package1000] :
                      customerAmount === 3000 ?
                        [...activePackages, packages.package3000] :
                        customerAmount === 5000 ?
                          [...activePackages, packages.package5000] :
                          customerAmount === 10000 ?
                            [...activePackages, packages.package10000] :
                            customerAmount === 20000 ?
                              [...activePackages, packages.package20000] :
                              customerAmount === 50000 ?
                                [...activePackages, packages.package50000] : null
        })
      }


      // Update user transaction information
      const q = query(collection(firestore, 'payments'), where('id', '==', customerCode));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          status: 'COMPLETED',
        })
      });


      await updateMainReferralBalance()


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

  // ======================= Give 10 percentage to my main referral  ======================= //
  const { users } = useUsers();

  const getMainReferralDocument = async () => {
    try {
      if (customerId === null || customerId === undefined) return
      // Get the REFERRAL document
      const userRef = doc(firestore, 'users', customerId);
      const userDoc = await getDoc(userRef);

      if (userDoc?.data()?.referral?.referrerBy === null || userDoc?.data()?.referral?.referrerBy === undefined) return
      // Filter the main referral
      const mainReferral = users?.filter(user => user?.referral?.referralCode === userDoc?.data()?.referral?.referrerBy)
      return mainReferral
    }
    catch (error) {
      console.log('getMainReferralDocument', error)
    }
  }

  const updateMainReferralBalance = async () => {
    try {
      if (customerId === null || customerId === undefined) return
      const mainReferral = await getMainReferralDocument()

      if (mainReferral[0] === null || mainReferral[0] === undefined) return

      const { Applied, referral, userId: mainID } = mainReferral[0]

      const docRef = doc(firestore, 'users', mainID);
      if (Applied > 0) {
        await updateDoc(docRef, {
          referral: {
            ...referral,
            ReferralBalance: Number(referral?.ReferralBalance) + Number(customerAmount * 0.10)
          }
        })
      }

    } catch (error) {
      console.log('updateMainReferralBalance', error)
    }
  }


  // ======================= LOADER  ======================= //

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);

  }, [])
  const loader = () => { return <FallBackLoader /> };
  if (isLoading) return loader();
  else {
    return (
      <>
        {
          filterTransactions ?
            (
              <>
                {
                  // ==================================================== ADMIN ==================================================== 
                  rol === 'admin' && rol !== 'investor' && rol !== '' && rol !== 'sponsored' || rol === 'owner' ?
                    (
                      <>
                        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                          <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                            <div className="flex justify-around">
                              <div className="inline-flex border rounded w-10/12 px-2 lg:px-6 h-12 bg-transparent">
                                <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative gap-4">
                                  <div className="flex">
                                    <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-white-normal text-sm">
                                      <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs text-gray-500 font-thin text-center"
                                    placeholder='Search_by_Customer_information_or_Transaction_code'
                                    onChange={e => {
                                      setTransactionSearch(e.target.value)
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                            <table className="min-w-full" ref={tableRef}>
                              <thead>
                                <tr>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-white-normal tracking-wider text-8x1">ID</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider text-8x1">paymentId</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider text-8x1">Transaction</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider text-8x1">CustomerId</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider text-8x1">Username</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider text-8x1">Status</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider text-8x1">Amount</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider text-8x1">Date</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider text-8x1">Action</th>
                                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-normal tracking-wider"></th>
                                  <th className="px-6 py-3 border-b-8 border-gray-login_input_bg"></th>
                                </tr>
                              </thead>
                              {
                                filterTransactions?.length > 0 ? (
                                  <>

                                    {
                                      filterTransactions?.slice(0, 20).map((item, i) => (

                                        <tbody className="bg-white " key={i}>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-button">
                                              <div className="flex items-center">
                                                <div>
                                                  <div className="text-sm leading-5 text-white-normal font-semibold">{item.id.substring(0, 8)}</div>
                                                </div>
                                              </div>
                                            </td>
                                            {
                                              item?.nowpayments?.paymentId !== undefined ? (
                                                <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal border-gray-500 text-sm leading-5">{item?.nowpayments?.paymentId}</td>
                                              ) : (<>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal border-gray-500 text-sm leading-5">{item?.customNowpayments?.paymentId}</td>
                                              </>)
                                            }
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                              <div className="text-sm leading-5 text-white-normal">{item.currency}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal border-gray-500 text-sm leading-5 text-ellipsis">{item.userId}</td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal border-gray-500 text-sm leading-5 text-ellipsis">{item.username}</td>

                                            <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal border-gray-500 text-sm leading-5">
                                              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative text-sm text-green-success font-bold">
                                                  {
                                                    item.status === 'NEW' ? (
                                                      <>
                                                        <p className="py-4 whitespace-no-wrap border-b  border-gray-border text-sm leading-5 text-ellipsis uppercase text-yellow-pending font-bold">Pending</p>
                                                      </>
                                                    ) :
                                                      item.status === 'COMPLETED' ? (
                                                        <>
                                                          <p className="py-4 whitespace-no-wrap border-b  border-gray-border text-sm leading-5 text-ellipsis uppercase text-green-success font-bold">Activated</p>
                                                        </>
                                                      ) :
                                                        item.status === 'EXPIRED' ? (
                                                          <>
                                                            <p className="py-4 whitespace-no-wrap border-b  border-gray-border text-sm leading-5 text-ellipsis uppercase text-gray-info font-bold">Expired</p>
                                                          </>
                                                        ) : null
                                                  }
                                                </span>
                                              </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-white-normal text-sm leading-5">
                                              {`$${parseFloat(item.amount).toFixed(2).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                              })}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-white-normal text-sm leading-5"> {formatRelative(item.date, new Date(), { addSuffix: true })}</td>

                                            {
                                              item.status === 'NEW' ? (
                                                <>
                                                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                                    <button
                                                      onClick={() => {
                                                        setCustomerId(item.userId)
                                                        setCustomerCode(item.id)
                                                        setCustomerName(item.username)
                                                        setCustomerAmount(item.amount)
                                                        setCustomerCurrency(item.currency)
                                                        openModal()
                                                      }}
                                                      className="px-5 py-2 border-blue-primary border text-center text-blue-emblema rounded transition duration-300 hover:bg-black-login_button hover:text-white-normal focus:outline-none font-bold"
                                                    >Activate</button>
                                                  </td>
                                                </>
                                              ) :
                                                item.status === 'COMPLETED' ? (
                                                  <>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                                      <button
                                                        className=" cursor-not-allowed px-5 py-2 border-blue-primary border text-center text-green-success rounded transition duration-300 hover:bg-white-normal hover:text-green-success focus:outline-none font-bold"
                                                      >Activated</button>
                                                    </td>
                                                  </>
                                                ) : null
                                            }
                                          </tr>
                                        </tbody>

                                      ))
                                    }

                                  </>
                                ) : null
                              }


                            </table>

                            <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
                            </div>
                          </div>
                        </div>

                        {/* ========================== MODAL ========================== */}
                        {
                          modal && (
                            <>
                              {/* <!-- Main modal --> */}
                              <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full ${styles.authenticationmodal}`} >
                                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                  {/* <!-- Modal content --> */}
                                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex justify-end p-2">
                                      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" onClick={() => closeModal()}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                      </button>
                                    </div>
                                    <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                                      <h3 className="text-xl font-medium text-gray-900 dark:text-white uppercase">Package_activation</h3>
                                      <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Investment_Currency</label>
                                        <input
                                          id="packageName"
                                          className="bg-gray-50 border border-gray-primary text-black-normal text-sm rounded-lg focus:ring-black-border focus:border-blue-500 block w-full p-2.5 dark:bg-white-placeholder dark:border-green-success dark:placeholder-gray-400 dark:text-black-normal font-bold"
                                          defaultValue='TETHER'
                                          required
                                        />

                                      </div>
                                      <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Package_Amount</label>
                                        <input
                                          type='number'
                                          id='amount'
                                          placeholder='Fill the user investment amount'
                                          className="bg-gray-50 border border-gray-primary text-black-normal text-sm rounded-lg focus:ring-blue-platino focus:border-blue-500 block w-full p-2.5 dark:bg-white-placeholder dark:border-white-primary dark:placeholder-gray-400 dark:text-black-normal font-bold"
                                          defaultValue={select.packagePrice}
                                          onChange={(e) => setSelect({ ...select, packagePrice: e.target.value })}
                                        />
                                      </div>

                                      <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-normal">Admin_Name</label>
                                        <input type="text" name="password" id="user" defaultValue={username} className="bg-gray-50 border border-white-primary text-white-normal font-bold text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" required disabled />
                                      </div>
                                      <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-normal">Customer_Id</label>
                                        <input type="text" name="customerId" id="customerId" defaultValue={customerId} className="bg-gray-50 border border-white-primary text-white-normal font-bold text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" required disabled />
                                      </div>
                                      <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-normal">Transaction_Code</label>
                                        <input type="text" name="customerId" id="customerId" defaultValue={customerCode} className="bg-gray-50 border border-white-primary text-white-normal font-bold text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" required disabled />
                                      </div>
                                      <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-normal">Transaction_Currency</label>
                                        <input type="text" name="customerId" id="customerId" defaultValue={customerCurrency} className="bg-gray-50 border border-white-primary text-white-normal font-bold text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" required disabled />
                                      </div>
                                      <div>
                                        <label htmlFor="password" className="block mb-2 text-sm text-gray-900 dark:text-white-normal font-semibold">Transaction_Amount</label>
                                        <input type="text" name="customerId" id="customerId" defaultValue={`$${customerAmount}`} className="bg-grwhite-normal-50 border border-white-primary text-green-success font-bold text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" required disabled />
                                      </div>
                                      <div>

                                        {
                                          success && (
                                            <p className="text-5x1 text-white-normal font-bold mb-5 text-center">{success}</p>
                                          )
                                        }
                                        <button type="button" className={`bg-blue-primary border border-gray-300 text-white-normal font-bold text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${isInvalid ? 'cursor-not-allowed hover:bg-red-warning' : 'cursor-pointer hover:bg-green-button'}`} onClick={() => updateBalance()} >
                                          Activate
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </>
                          )

                        }
                      </>

                    ) :
                    // ==================================================== USER ==================================================== 
                    clientTransactions?.length > 0 && rol !== 'admin' && rol === 'investor' || clientTransactions?.length > 0 && rol !== 'admin' && rol === 'sponsored' ?
                      (
                        <>

                          <div className="overflow-x-auto  w-full">
                            <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden  shadow-lg">
                              <div className="flex justify-center">
                                <div className={`${styles.userTransactions} uppercase w-full`} >
                                  Transactions
                                </div>
                              </div>
                            </div>
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
                              <table
                                className="table shadow rounded-lg w-full h-full justify-between"
                                id="table-to-xls"
                                ref={tableRef}
                              >


                                <thead className='flex justify-between items-center w-full  overflow-scroll'>
                                  <tr className='flex justify-around items-center w-full  '>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      #
                                    </th>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      Transaction
                                    </th>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      Code
                                    </th>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      Status
                                    </th>

                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      Total
                                    </th>
                                    <th className={`${styles.fee} border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold`} >
                                      Ticket
                                    </th>
                                  </tr>
                                </thead>


                                {
                                  clientTransactions?.slice(0, 50).map((item, k) => (

                                    <tbody key={k} className='flex justify-between items-center w-full' >
                                      <tr className="text-gray-700 flex justify-around items-center w-full">
                                        <td className="border p-4 dark:border-black-background">
                                          {k + 1}
                                        </td>
                                        <td className="border p-4 dark:border-black-background font-bold">
                                          {item.currency.substring(0, 10)}
                                          <p className='font-light'>
                                            {formatRelative(item.date, new Date(), { addSuffix: true })}
                                          </p>
                                        </td>
                                        <td className="border p-4 dark:border-black-background">
                                          {`${item.id.substring(0, 7)}`}
                                        </td>
                                        <td className="border p-4 dark:border-black-background">
                                          {
                                            item.length < 0 ? (
                                              <>
                                                <tr className='text-8x1'>Heres_where_youre_going_to_see_all_your_transactions</tr>
                                              </>

                                            ) : (
                                              <>
                                                {
                                                  item.status === 'COMPLETED' ?
                                                    (
                                                      <div className="text-sm leading-5 0 text-green-success uppercase font-semibold">Completed</div>

                                                    ) : item?.status === 'PENDING' ? (
                                                      <div className="text-sm leading-5 text-badges-gold uppercase font-semibold">Pending</div>
                                                    ) : item.status === 'NEW' && (
                                                      <div className="text-sm leading-5 text-badges-gold uppercase font-semibold">Open</div>
                                                    )
                                                }
                                              </>
                                            )
                                          }
                                        </td>

                                        <td className="border p-4 dark:border-black-background font-bold">
                                          {item.amount}
                                        </td>

                                      </tr>
                                    </tbody>
                                  ))
                                }
                              </table>
                              <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="overflow-x-auto  w-full">
                            <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden  shadow-lg">
                              <div className="flex justify-center">
                                <div className={`${styles.userTransactions} uppercase w-full`} >
                                  Transactions
                                </div>
                              </div>
                            </div>
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
                              <table className="table shadow rounded-lg w-full h-full justify-between">

                                <thead className='flex justify-between items-center w-full  overflow-scroll'>
                                  <tr className='flex justify-between items-center w-full  '>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      #
                                    </th>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      Transaction
                                    </th>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      Code
                                    </th>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      Status
                                    </th>
                                    <th className={`${styles.fee} border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold`}>
                                      Amount
                                    </th>
                                    <th className="border p-4 dark:border-dark-5 whitespace-nowrap  text-gray-900 font-semibold">
                                      Total
                                    </th>
                                  </tr>
                                </thead>

                                <tbody className='flex justify-between items-center w-full' >
                                  <tr className="text-gray-700 flex justify-between items-center w-full">
                                    <td className='text-center my-10 w-full flex flex-col justify-center items-center'>
                                      <p className='text-3xl'>Heres_where_youre_going_to_see_all_your_transactions</p>
                                      <img src="/images/crypto/transactions.png" alt="transactions logo" className='w-24 h-24 ' />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )
                }
              </>
            )
            :
            (
              null
            )
        }

        <div className='flex justify-center text-center w-full my-10'>
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            className="font-semibold text-md text-black-normal w-full"
            currentTableRef={tableRef.current}
          >
            <button className='bg-gray-info text-white-normal rounded-md w-44 h-10 flex justify-center items-center'> Export excel </button>
          </DownloadTableExcel>
        </div>

      </>
    )
  }
}
export default memo(Transactions)

Transactions.propTypes = {
  list: PropTypes.any,
  transactionSearch: PropTypes.string,
  setTransactionSearch: PropTypes.func,
}
Transactions.whyDidYouRender = true