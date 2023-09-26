import React, { useState } from 'react'
import useUser from '../../../hooks/use-user'
import useStaking from '../../../hooks/use-staking'
import useDeposits from '../../../hooks/use-deposits'
// import TransactionsHeader from './transactions-header'
import TransactionsCards from './transactions-cards'
import TransactionsHistorial from './transactions-historial'
import TransactionsPayoutModal from './modal/transactions-payout-modal'
import useWithdrawals from '../../../hooks/use-withdrawals'
import useAuthListener from '../../../hooks/use-auth-listener'
import shortid from 'shortid';
// import Header from '../../header/header-second'
import useWalletWithdrawals from '../../../hooks/use-walletWithdrawals';
//firebase
import { firebase } from '../../../lib/firebase'
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const ArtificialTransactionsWithdrawal = () => {

    const { deposits } = useDeposits()
    const { staking } = useStaking()
    const { user } = useUser()
    const { withdrawals } = useWithdrawals()
    const { withdrawals: userWalletWithdrawals } = useWalletWithdrawals()
    const { user: currentUser } = useAuthListener()
    const [loader, setLoader] = useState(false);
    const [loaderError, setLoaderError] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const filterUserWithdrawals = withdrawals.filter(w => w.CustomerId === currentUser.uid)
    const filterUserWalletWithdrawals = userWalletWithdrawals.filter(w => w.CustomerId === currentUser.uid)

    const [withdrawalAmount, setWithdrawalAmount] = useState(0)
    const [pin, setPin] = useState('')
    const [pinError, setPinError] = useState('')
    const [withdrawalAmountError, setWithdrawalAmountError] = useState('')
    const [searchTransaction, setSearchTransaction] = useState('')
    const [searchWithdrawal, setSearchWithdrawal] = useState('')
    const [searchWalletWithdrawal, setSearchWalletWithdrawal] = useState('')
    const [tabs, setTabs] = useState({
        deposits: true,
        withdrawals: false,
        wallet: false,
        staking: false,
    });
    const [tabsWithdrawal, setTabsWithdrawal] = useState({
        wallet: false,
        external: false,
    })


    const [modal, setModal] = useState(false)

    const openModal = () => {
        setModal(true)
    };

    const closeModal = () => {
        setModal(false)
        setWithdrawalAmount(0)
        setTabsWithdrawal({
            wallet: false,
            external: false,
        })
    };

    const filteredTransactions = deposits?.filter(search =>
        search.id?.toLowerCase().includes(searchTransaction.toLowerCase()) ||
        search.currency?.toLowerCase().includes(searchTransaction.toLowerCase()) ||
        search.status?.toLowerCase().includes(searchTransaction.toLowerCase())
    )

    const filteredWithdrawals = filterUserWithdrawals?.filter(search =>
        search.WithdrawalId?.toLowerCase().includes(searchWithdrawal.toLowerCase()) ||
        search.WithdrawalStatus?.toLowerCase().includes(searchWithdrawal.toLowerCase()) ||
        search.CustomerWallet?.toLowerCase().includes(searchWithdrawal.toLowerCase()) ||
        search.CustomerEmail?.toLowerCase().includes(searchWithdrawal.toLowerCase()) ||
        search.WithdrawalCurrency?.toLowerCase().includes(searchWithdrawal.toLowerCase())
    )
    const filteredWalletWithdrawals = filterUserWalletWithdrawals?.filter(search =>
        search.WithdrawalId?.toLowerCase().includes(searchWalletWithdrawal.toLowerCase()) ||
        search.WithdrawalStatus?.toLowerCase().includes(searchWalletWithdrawal.toLowerCase()) ||
        search.CustomerWallet?.toLowerCase().includes(searchWalletWithdrawal.toLowerCase()) ||
        search.CustomerEmail?.toLowerCase().includes(searchWalletWithdrawal.toLowerCase()) ||
        search.WithdrawalCurrency?.toLowerCase().includes(searchWalletWithdrawal.toLowerCase())
    )


    const bankInformation = {
        tether: {
            Currency: 'TETHER',
            BankName: 'Tether (USDT)',
            AccountNumber: user?.wallet,
            AccountName: user?.username,
            WithdrawalAmount: user?.Withdrawal
        },
    }


    const transactionsFeeLess = parseInt(withdrawalAmount) - parseInt(withdrawalAmount) + 2.5;
    const transactionsFeeMore = parseInt(withdrawalAmount) * 0.05;
    const FeeCondition = transactionsFeeLess ? transactionsFeeLess : transactionsFeeMore;

    const data = {
        CustomerName: user?.fullName,
        CustomerId: currentUser.uid,
        CustomerEmail: currentUser.email,
        CustomerWallet: user?.wallet,
        CustomerCurrentBalance: user?.Balance,
        CustomerCurrentWithdrawal: user?.Withdrawal,
        CustomerLastWithdrawal: user?.Withdrawal,
        WithdrawalAmount: parseInt(withdrawalAmount) === parseInt(user?.Withdrawal) ? parseInt(user?.Withdrawal) : withdrawalAmount,
        WithdrawalFee: FeeCondition,
        WithdrawalStatus: 'Pending',
        WithdrawalId: shortid.generate(),
        WithdrawalDate: Date.now(),
        WithdrawalInformation: bankInformation,
        WithdrawalCurrency: 'TETHER',
        WithdrawalURL: '',
        AdminName: '',
    }

    const earnings = {
        date: Date.now(),
        amount: parseInt(withdrawalAmount),
        userId: currentUser.uid,
        CustomerEmail: currentUser.email,
        CustomerWallet: user?.wallet,
        WithdrawalId: shortid.generate(),
        username: user?.username,
    }


    // Withdrawal Manual Request
    const makeWithdrawalRequest = async () => {
        try {
            if (pin === user?.pin) {
                if (data?.CustomerId === user?.userId) {
                    if (data?.CustomerId !== '') {
                        if (parseInt(withdrawalAmount) <= parseInt(user?.Withdrawal)) {
                            if (parseInt(user?.Withdrawal) >= 10 && parseInt(withdrawalAmount) >= 10) {
                                //eslint-disable-next-line no-unused-vars
                                const docRef = await addDoc(collection(firestore, 'Withdrawals'), data);
                                //eslint-disable-next-line no-unused-vars
                                const eoverviewRef = await addDoc(collection(firestore, 'earnings-overview'), earnings);
                                setIsInvalid(true)
                                const userRef = doc(firestore, 'users', user.docId);
                                setLoader(true)
                                if (parseInt(user?.Withdrawal) >= 10) {
                                    await updateDoc(userRef, {
                                        Withdrawal: parseInt(withdrawalAmount) === parseInt(user?.Withdrawal) ? 0 : parseInt(user?.Withdrawal) - parseInt(withdrawalAmount),
                                    })
                                }
                            } else {
                                setWithdrawalAmountError('ERROR: minimum withdrawal is $10 USD')
                            }
                        } else {
                            setWithdrawalAmountError('ERROR: You cannot withdraw more than available')
                        }
                    }
                }
            } else {
                setPinError('Wrong security pin')
            }
            setTimeout(() => {
                setLoaderError('')
                setWithdrawalAmountError('')
                setLoader(false)
                setTimeout(() => {
                    window.location.reload()
                }, 50)
            }, 1000)
        } catch (err) {
            console.log(err)
        }
    }


    const transferAvailable = async () => {
        try {
            if (pin === user?.pin) {
                if (data?.CustomerId === user?.userId) {
                    if (data?.CustomerId !== '') {
                        if (parseInt(withdrawalAmount) <= parseInt(user?.Withdrawal)) {
                            if (parseInt(user?.Withdrawal) >= 10 && parseInt(withdrawalAmount) >= 10) {
                                //eslint-disable-next-line no-unused-vars
                                setIsInvalid(true)
                                const userRef = doc(firestore, 'users', user.docId);
                                setLoader(true)
                                if (parseInt(user?.Withdrawal) >= 10) {
                                    await updateDoc(userRef, {
                                        Withdrawal: parseInt(withdrawalAmount) === parseInt(user?.Withdrawal) ? 0 : parseInt(user?.Withdrawal) - parseInt(withdrawalAmount),
                                    })
                                    await updateDoc(userRef, {
                                        topupBalance: parseInt(user?.topupBalance) + parseInt(withdrawalAmount),
                                    })
                                }
                            } else {
                                setWithdrawalAmountError('ERROR: minimum withdrawal is $10 USD')
                            }
                        } else {
                            setWithdrawalAmountError('ERROR: You cannot withdraw more than available')
                        }
                    }
                }
            } else {
                setPinError('Wrong security pin')
            }
            setTimeout(() => {
                setLoaderError('')
                setWithdrawalAmountError('')
                setLoader(false)
                setTimeout(() => {
                    window.location.reload()
                }, 50)
            }, 1000)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {/* <Header
                user={user}
            /> */}
            <TransactionsCards
                user={user}
                staking={staking}
            />
            <TransactionsHistorial
                deposits={deposits}
                setSearchTransaction={setSearchTransaction}
                filteredTransactions={filteredTransactions}
                tabs={tabs}
                setTabs={setTabs}
                openModal={openModal}
                closeModal={closeModal}
                filteredWithdrawals={filteredWithdrawals}
                setSearchWithdrawal={setSearchWithdrawal}
                filteredWalletWithdrawals={filteredWalletWithdrawals}
                setSearchWalletWithdrawal={setSearchWalletWithdrawal}
            />

            {
                modal &&
                (
                    <TransactionsPayoutModal
                        user={user}
                        closeModal={closeModal}
                        setWithdrawalAmount={setWithdrawalAmount}
                        makeWithdrawalRequest={makeWithdrawalRequest}
                        withdrawalAmountError={withdrawalAmountError}
                        isInvalid={isInvalid}
                        loader={loader}
                        loaderError={loaderError}
                        withdrawalAmount={withdrawalAmount}
                        setPin={setPin}
                        pinError={pinError}
                        setTabsWithdrawal={setTabsWithdrawal}
                        tabsWithdrawal={tabsWithdrawal}
                        transferAvailable={transferAvailable}
                    />
                )
            }
        </>
    )
}


export default ArtificialTransactionsWithdrawal