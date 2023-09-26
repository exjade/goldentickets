import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/admin-transactions.module.css';
import { formatRelative } from 'date-fns';

const TransactionsAdmin = ({
    setTransactionSearch,
    setCustomerId,
    setCustomerCode,
    setCustomerName,
    setCustomerAmount,
    setCustomerCurrency,
    success,
    customerId,
    customerCode,
    customerAmount,
    customerCurrency,
    username,
    modal,
    openModal,
    closeModal,
    tableRef,
    isInvalid,
    filterTransactions,
    select,
    setSelect,
    updateBalance,
}) => {


    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`}>
                {/* ==============================================================================*/}
                <>
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                            <div className="flex justify-around">
                                <div className="inline-flex border rounded w-10/12 px-2 lg:px-6 h-12 bg-transparent">
                                    <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative gap-4">
                                        <div className="flex">
                                            <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                                <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs text-black-normal font-xl text-center"
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
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4  text-white-normal tracking-wider text-8x1">ID</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider text-8x1">paymentId</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider text-8x1">Transaction</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider text-8x1">CustomerId</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider text-8x1">Username</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider text-8x1">Status</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider text-8x1">Amount</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider text-8x1">Date</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider text-8x1">Action</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  text-white-normal tracking-wider"></th>
                                        <th className="px-6 py-3 border-b-8 border-gray-login_input_bg"></th>
                                    </tr>
                                </thead>
                                {
                                    filterTransactions?.length > 0 ? (
                                        <>
                                            {
                                                filterTransactions?.slice(0, 20).map((item, i) => (
                                                    <tbody className="bg-white" key={i}>
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-button">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        <div className="text-sm leading-5 text-white-primary font-semibold text-white-normal">{item.id.substring(0, 8)}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {
                                                                item?.depositBalance[0]?.payment_id !== undefined ? (
                                                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal  border-gray-500 text-sm leading-5">{item?.depositBalance[0]?.payment_id}</td>
                                                                ) : (<>
                                                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal  border-gray-500 text-sm leading-5">{item?.depositBalance[0]?.payment_id}</td>
                                                                </>)
                                                            }
                                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                                <div className="text-sm leading-5 text-white-normal ">{item.currency}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal  border-gray-500 text-sm leading-5 text-ellipsis">{item.userId}</td>
                                                            <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal  border-gray-500 text-sm leading-5 text-ellipsis">{item.username}</td>

                                                            <td className="px-6 py-4 whitespace-no-wrap border-b text-white-normal  border-gray-500 text-sm leading-5">
                                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                                    <span className="relative text-sm text-green-success font-bold">
                                                                        {
                                                                            item.status === 'NEW' ? (
                                                                                <>
                                                                                    <p className="py-4 whitespace-no-wrap border-b  border-gray-primary text-sm leading-5 text-ellipsis uppercase text-yellow-pending font-bold">Pending</p>
                                                                                </>
                                                                            ) :
                                                                                item.status === 'COMPLETED' ? (
                                                                                    <>
                                                                                        <p className="py-4 whitespace-no-wrap border-b  border-gray-primary text-sm leading-5 text-ellipsis uppercase text-green-secondary font-bold">Activated</p>
                                                                                    </>
                                                                                ) :
                                                                                    item.status === 'EXPIRED' ? (
                                                                                        <>
                                                                                            <p className="py-4 whitespace-no-wrap border-b  border-gray-primary text-sm leading-5 text-ellipsis uppercase text-gray-info font-bold">Expired</p>
                                                                                        </>
                                                                                    ) : null
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-white-normal  text-sm leading-5">
                                                                {`$${parseFloat(item.amount).toFixed(2).toLocaleString('en-US', {
                                                                    style: 'currency',
                                                                    currency: 'USD',
                                                                })}`}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-white-normal  text-sm leading-5"> {formatRelative(item.date, new Date(), { addSuffix: true })}</td>

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
                                                                                className="px-5 py-2 border-blue-button border hover:bg-green-primary text-center text-blue-emblema rounded transition duration-300 hover:bg-black-login_button text-white-normal focus:outline-none font-bold"
                                                                            >Activate</button>
                                                                        </td>
                                                                    </>
                                                                ) :
                                                                    item.status === 'COMPLETED' ? (
                                                                        <>
                                                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                                                                <button
                                                                                    // onClick={() => console.log('hola')}
                                                                                    className=" cursor-not-allowed px-5 py-2 bg-green-primary border text-center text-white-normal rounded transition duration-300 hover:bg-white-normal hover:text-black-normal focus:outline-none font-bold"
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
                                                        disabled
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
                                                    <button
                                                        type="button"
                                                        className={`bg-blue-button border border-gray-300 text-white-normal font-bold text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${isInvalid ? 'cursor-not-allowed hover:bg-red-warning' : 'cursor-pointer hover:bg-green-button'}`}
                                                        onClick={() => updateBalance()}
                                                    >
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
                {/* ==============================================================================*/}
            </div>
        </div>
    )
}

export default TransactionsAdmin


TransactionsAdmin.propTypes = {
    username: PropTypes.string,
    rol: PropTypes.string,
    setTransactionSearch: PropTypes.func,
    transactionSearch: PropTypes.any,
    setCustomerId: PropTypes.func,
    setCustomerCode: PropTypes.func,
    setCustomerName: PropTypes.func,
    setCustomerAmount: PropTypes.func,
    setCustomerCurrency: PropTypes.func,
    success: PropTypes.any,
    customerId: PropTypes.any,
    customerCode: PropTypes.any,
    customerName: PropTypes.any,
    customerAmount: PropTypes.any,
    customerCurrency: PropTypes.any,
    modal: PropTypes.bool,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    tableRef: PropTypes.any,
    isInvalid: PropTypes.any,
    filterTransactions: PropTypes.any,
    transactionsInPlatform: PropTypes.any,
    select: PropTypes.object,
    setSelect: PropTypes.func,
    updateBalance: PropTypes.func,
}