import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//hooks
import useAuthListener from '../../../hooks/use-auth-listener';
import useUser from '../../../hooks/use-user'
//components
import ModalWithdrawal from './modal-wallet-withdrawals';
//loader
import ActivateLoader from '../../withdrawal/loader/activate-loader';
//firebase
import { firebase } from '../../../lib/firebase';
import {
    getFirestore,
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore';
const firestore = getFirestore(firebase)

const TableWithdrawals = ({ withdrawals }) => {
    const { user: currentUser } = useUser()
    const { user } = useAuthListener();
    const [withdrawalSearch, setWithdrawalSearch] = useState('');
    const transactions = withdrawals?.filter(withdrawal => withdrawal)
    const filteredTransactions = transactions?.filter(search =>
        search.CustomerId?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.CustomerName?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.CustomerWallet?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.WithdrawalId?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.WithdrawalStatus?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.WithdrawalInformation?.AccountName?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.WithdrawalInformation?.AccountNumber?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.WithdrawalInformation?.BankName?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.WithdrawalInformation?.Currency?.toLowerCase().includes(withdrawalSearch.toLowerCase()) ||
        search.WithdrawalInformation?.WithdrawalCurrency?.toLowerCase().includes(withdrawalSearch.toLowerCase())
    )

    //CUSTOMER
    const [customerName, setCustomerName] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [CustomerAgencia, setCustomerAgencia] = useState(null);
    const [CustomerChavePix, setCustomerChavePix] = useState(null);
    const [customerWallet, setCustomerWallet] = useState(null);
    const [withdrawalStatus, setWithdrawalStatus] = useState(null);
    const [withdrawalAmount, setWithdrawalAmount] = useState(null);
    const [withdrawalBankName, setWithdrawalBankName] = useState(null);
    const [withdrawalAccountNumber, setWithdrawalAccountNumber] = useState(null);
    const [withdrawalHolderName, setWithdrawalHolderName] = useState(null);
    const [withdrawalCurrency, setWithdrawalCurrency] = useState(null);
    const [withdrawalId, setWithdrawalId] = useState(null);
    const [blockchainURL, setBlockchainURL] = useState(null);
    const [withdrawalDocId, setWithdrawalDocId] = useState(null);
    const [withdrawalFee, setWithdrawalFee] = useState(null);
    // MODAL
    const [modal, setModal] = useState(false);
    const handleOpenModal = () => setModal(true);
    const handleCloseModal = () => setModal(false);
    const [processing, setProcessing] = useState(false);


    const updateWithdrawal = async () => {
        try {
            if (withdrawals.length > 0) {
                const withdrawalRef = doc(firestore, 'wallet-withdrawals', withdrawalDocId);

                await withdrawalLog() // create a log of the withdrawal
                // Update the withdrawal document
                await updateDoc(withdrawalRef, {
                    AdminName: user?.displayName,
                    WithdrawalStatus: 'Deposited',
                    WithdrawalModerator: user?.email,
                    WithdrawalURL: blockchainURL,
                });
                setProcessing(true)
                setTimeout(() => {
                    setBlockchainURL(null);
                    setWithdrawalStatus(null);
                    setWithdrawalAmount(null);
                    setWithdrawalId(null);
                    setCustomerName(null);
                    setCustomerWallet(null);
                    setModal(false);
                    window.location.reload()
                }, 3000);
            }
            console.log('Withdrawal updated');

        } catch (error) {
            console.log(error)
        }
    }

    const withdrawalLog = async () => {
        await setDoc(doc(firestore, 'logsWithdrawal', customerId), {
            wallet: customerWallet,
            customerId: customerId,
            customerName: customerName,
            Amount: withdrawalAmount,
            adminID: currentUser?.userId,
            adminName: currentUser?.username,
            url: blockchainURL,
            date: Date.now(),
            status: 'COMPLETED'
        })
    }

    //Loader
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        document.title = 'ADMIN - Withdrawals Activation';
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

    }, [])

    const loader = () => { return <ActivateLoader /> }

    if (isLoading) return loader();
    else {

        return (
            <>
                <section className="antialiased bg-gray-100 text-gray h-screen px-4">
                    <div className="flex flex-col justify-center h-full">
                        <div className='w-full h-16 mx-auto bg-white-normal rounded-sm border border-gray-200 flex justify-center items-center'>
                            <input
                                type="text"
                                className='w-9/12 text-center outlined-none'
                                placeholder={'Search_withdrawal_information'}
                                onChange={e => {
                                    setWithdrawalSearch(e.target.value)
                                }}
                            />
                        </div>

                        <div className="w-full h-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-2xl capitalize text-center">Customers_withdrawal_requests</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">

                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">ID</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">Status</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">CustomerId</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">Holder Name</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">Username</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">Bank Name</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">Account Number</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">Fee</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-bold text-base">Spent</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="text-center font-bold"></div>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="text-md divide-y divide-gray">
                                            {
                                                filteredTransactions?.map((withdrawal, index) => (
                                                    <React.Fragment key={index} >
                                                        <tr className='divide-y divide-gray'>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-bold text-gray-login_input_bg">{withdrawal.WithdrawalId}</div>
                                                                </div>
                                                            </td>
                                                            {/* REINVESTMENT */}
                                                            {
                                                                withdrawal?.isReinvestment ? (
                                                                    <>
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            {
                                                                                withdrawal.WithdrawalStatus === 'Pending' ? (
                                                                                    <div className="text-left text-badges-gold font-extrabold">Pending</div>
                                                                                ) : (
                                                                                    <div className="text-left text-green-success font-extrabold">Reinvestment</div>
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </>
                                                                ) :
                                                                    (<>
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            {
                                                                                withdrawal.WithdrawalStatus === 'Pending' ? (
                                                                                    <div className="text-left text-badges-gold font-extrabold">Pending</div>
                                                                                ) : (
                                                                                    <div className="text-left text-green-success font-extrabold">Deposited</div>
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </>)
                                                            }

                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-semibold">{withdrawal.CustomerId}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{withdrawal?.CustomerName}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-semibold">{withdrawal.WithdrawalInformation?.tether?.AccountName}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-semibold">{withdrawal.WithdrawalInformation?.tether?.BankName}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-semibold">{withdrawal.WithdrawalInformation?.tether?.AccountNumber}</div>
                                                            </td>

                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-extrabold text-xl text-black-normal">
                                                                    {`${parseFloat(withdrawal?.WithdrawalFee).toLocaleString('en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD',
                                                                    })}`}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-extrabold text-xl text-black-normal">
                                                                    {`${parseFloat(withdrawal?.WithdrawalAmount).toLocaleString('en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD',
                                                                    })}`}
                                                                </div>
                                                            </td>
                                                            {
                                                                withdrawal?.isReinvestment ?
                                                                    (<>
                                                                        <button
                                                                            type='button'
                                                                            className="p-2 text-center whitespace-nowrap bg-green-radored rounded-lg text-white-normal font-semibold text-sm
                                                                              hover:bg-gray-button uppercase cursor-not-allowed"
                                                                            disabled
                                                                        >
                                                                            Activated
                                                                        </button>
                                                                    </>)
                                                                    :
                                                                    (<>
                                                                        <button
                                                                            type='button'
                                                                            className="p-2 text-center whitespace-nowrap bg-green-button rounded-lg text-white-normal font-semibold text-sm  hover:bg-green-success uppercase"
                                                                            onClick={() => {
                                                                                setCustomerName(withdrawal.CustomerName);
                                                                                setCustomerWallet(withdrawal.CustomerWallet);
                                                                                setWithdrawalStatus(withdrawal.WithdrawalStatus);
                                                                                setWithdrawalAmount(withdrawal.WithdrawalAmount);
                                                                                setWithdrawalId(withdrawal.WithdrawalId);
                                                                                setCustomerId(withdrawal.CustomerId);
                                                                                setWithdrawalDocId(withdrawal.docId);
                                                                                setWithdrawalBankName(withdrawal.WithdrawalInformation?.tether?.BankName)
                                                                                setWithdrawalAccountNumber(withdrawal.WithdrawalInformation?.AccountNumber)
                                                                                setWithdrawalHolderName(withdrawal.WithdrawalInformation?.AccountName)
                                                                                setWithdrawalCurrency(withdrawal.WithdrawalInformation?.tether?.BankName)
                                                                                setCustomerAgencia(withdrawal?.Agencia)
                                                                                setCustomerChavePix(withdrawal?.ChavePix)
                                                                                setWithdrawalFee(withdrawal.WithdrawalFee)
                                                                                handleOpenModal();
                                                                            }}
                                                                        >
                                                                            Activate
                                                                        </button>
                                                                    </>)
                                                            }

                                                        </tr>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* MODAL ACTIVATION */}
                        {
                            modal && (
                                <ModalWithdrawal
                                    handleCloseModal={handleCloseModal}
                                    updateWithdrawal={updateWithdrawal}
                                    customerName={customerName}
                                    customerWallet={customerWallet}
                                    withdrawalStatus={withdrawalStatus}
                                    withdrawalAmount={withdrawalAmount}
                                    withdrawalId={withdrawalId}
                                    setBlockchainURL={setBlockchainURL}
                                    processing={processing}
                                    withdrawalBankName={withdrawalBankName}
                                    withdrawalAccountNumber={withdrawalAccountNumber}
                                    withdrawalHolderName={withdrawalHolderName}
                                    withdrawalCurrency={withdrawalCurrency}
                                    CustomerAgencia={CustomerAgencia}
                                    CustomerChavePix={CustomerChavePix}
                                    withdrawalFee={withdrawalFee}
                                />
                            )
                        }

                    </div>
                </section>
            </>
        )
    }
}

export default TableWithdrawals

TableWithdrawals.propTypes = {
    withdrawals: PropTypes.array,
}