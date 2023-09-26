import { useEffect, useState } from 'react'
import shortid from 'shortid';
//custom hooks
import useMenu from '../../hooks/use-menu'
import useUser from '../../hooks/use-user'
import useWithdrawals from '../../hooks/use-withdrawals'
//components
import AdminView from './adminView'
import Header from './header'
import CardsComponent from './cards'
import WithdrawalHistory from './history'
import ReinvestmentHistory from './reinvestment';
import WithdrawalTabs from './withdrawal-tabs';
//styles
import styles from '../../styles/modules/withdrawal/withdrawal.module.css';
//firebase
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { useTranslation } from 'react-i18next';
const firestore = getFirestore(firebase)

const WithdrawalTimeline = () => {

    useEffect(() => { document.title = 'Withdrawals - Artificial' }, [])
    const { user,
        user: {
            userId, fullName,
            emailAddress,
            wallet,
            Balance,
            rol,
        } } = useUser()
    const { t } = useTranslation()
    const { openMenu, toggleOpen, toggleClose } = useMenu()
    const { withdrawals } = useWithdrawals()
    //eslint-disable-next-line no-unused-vars
    const orderByDate = withdrawals.sort((a, b) => {
        return new Date(b.WithdrawalDate) - new Date(a.WithdrawalDate)
    })
    const [loader, setLoader] = useState(false);
    const [loaderError, setLoaderError] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    //Currency
    // const [currency, setCurrency] = useState(null);
    const [withdrawalAmount, setWithdrawalAmount] = useState(0)
    const [withdrawalAmountError, setWithdrawalAmountError] = useState('')

    const [withdrawalTab, setWithdrawalTab] = useState({
        withdrawal: true,
        reinvestment: false
    })


    const bankInformation = {
        tether: {
            Currency: 'TETHER',
            BankName: 'Tether (USDT)',
            AccountNumber: user?.wallet,
            AccountName: user?.username,
            WithdrawalAmount: user?.Withdrawal
        },
    }

    const data = {
        CustomerName: fullName,
        CustomerId: userId,
        CustomerEmail: emailAddress,
        CustomerWallet: wallet,
        CustomerCurrentBalance: Balance,
        CustomerCurrentWithdrawal: user?.Withdrawal,
        CustomerLastWithdrawal: user?.Withdrawal,
        WithdrawalAmount: parseInt(withdrawalAmount) === parseInt(user?.Withdrawal) ? parseInt(user?.Withdrawal) : withdrawalAmount,
        WithdrawalFee: user?.Withdrawal * 0.05,
        WithdrawalStatus: 'Pending',
        WithdrawalId: shortid.generate(),
        WithdrawalDate: Date.now(),
        WithdrawalInformation: bankInformation,
        WithdrawalCurrency: 'TETHER',
        WithdrawalURL: '',
        AdminName: '',
        isReinvestment: false,
    }

    const reinvestmentData = {
        CustomerName: fullName,
        CustomerId: userId,
        CustomerEmail: emailAddress,
        CustomerWallet: wallet,
        CustomerCurrentBalance: Balance,
        CustomerCurrentWithdrawal: user?.Withdrawal,
        CustomerLastWithdrawal: user?.Withdrawal,
        WithdrawalAmount: parseInt(user?.Withdrawal),
        WithdrawalFee: user?.Withdrawal * 0.05,
        WithdrawalStatus: 'Completed',
        WithdrawalId: shortid.generate(),
        WithdrawalDate: Date.now(),
        WithdrawalInformation: bankInformation,
        WithdrawalCurrency: 'TETHER',
        WithdrawalURL: '',
        AdminName: '',
        isReinvestment: true,
    }


    // Withdrawal Manual Request
    const makeWithdrawalRequest = async () => {
        try {
            if (data?.CustomerId === user?.userId) {
                if (data?.CustomerId !== '' ) {
                    if (parseInt(withdrawalAmount) <= parseInt(user?.Withdrawal)) {
                        if (parseInt(user?.Withdrawal) >= 20 && parseInt(withdrawalAmount) >= 20) {
                            //eslint-disable-next-line no-unused-vars
                            const docRef = await addDoc(collection(firestore, 'Withdrawals'), data);
                            setIsInvalid(true)
                            const userRef = doc(firestore, 'users', user.docId);
                            setLoader(true)
                            if (parseInt(user?.Withdrawal) >= 20) {
                                await updateDoc(userRef, {
                                    Withdrawal: parseInt(withdrawalAmount) === parseInt(user?.Withdrawal) ? 0 : parseInt(user?.Withdrawal) - withdrawalAmount,
                                })
                            }
                        } else {
                            setWithdrawalAmountError('Sorry, the minimum withdrawal amount is ($20 USD)')
                        }
                    } else {
                        setWithdrawalAmountError('ERROR: You cannot withdraw more than available')
                    }
                }
            }
            setTimeout(() => {
                setLoaderError('')
                setWithdrawalAmountError('')
                setLoader(false)
                setTimeout(() => {
                    window.location.reload()
                }, 50)
            }, 3500)
        } catch (err) {
            console.log(err)
        }
    }


    /* ==== REINVEST  ==== */
    const makeReinvest = async () => {
        try {
            // Withdrawal Request - Tether (USDT)
            if (data?.CustomerId === user?.userId) {
                if (user?.Applied > 0) {
                    if (data?.CustomerId !== '') {
                        if (parseInt(user?.Withdrawal) >= 20) {
                            //eslint-disable-next-line no-unused-vars
                            const docRef = await addDoc(collection(firestore, 'Reinvestment'), reinvestmentData);
                            setIsInvalid(true)
                            const userRef = doc(firestore, 'users', user?.docId);
                            setLoader(true)
                            await updateDoc(userRef, {
                                Applied: parseInt(user?.Withdrawal) + parseInt(user?.Applied),
                            })
                            if (user?.Withdrawal > 1) {
                                await updateDoc(userRef, {
                                    Withdrawal: 0,
                                })
                            }
                        } else {
                            setLoaderError(t('Your account balance is less than the minimum withdrawal amount. Please wait until you have more money in your account before attempting to withdraw.'))
                        }
                    }
                }
            }

            setTimeout(() => {
                setLoader(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1400)
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }



    // const handleOnChange = (e) => {
    //     setCurrency(
    //         {
    //             ...currency,
    //             [e.target.name]: e.target.value
    //         })
    // }
    return (
        <>
            {
                rol === 'investor' && rol !== 'admin' || rol === 'sponsored' && rol !== 'admin' ? (
                    <>
                        <div className='h-screen w-screen overflow-x-hidden' >
                            <Header
                                openMenu={openMenu}
                                toggleOpen={toggleOpen}
                                toggleClose={toggleClose}
                                user={user}
                            />
                            <div className='w-full mt-36 h-full flex flex-col gap-9'>
                                {/* <section className='w-full flex justify-center items-center'>
                                    <SelectCurrency
                                        handleOnChange={handleOnChange}
                                    />
                                </section> */}
                                <section>
                                    <CardsComponent
                                        makeWithdrawalRequest={makeWithdrawalRequest}
                                        user={user}
                                        loader={loader}
                                        loaderError={loaderError}
                                        isInvalid={isInvalid}
                                        // currency={currency}
                                        withdrawalAmountError={withdrawalAmountError}
                                        withdrawalAmount={Number(withdrawalAmount)}
                                        setWithdrawalAmount={setWithdrawalAmount}
                                        makeReinvest={makeReinvest}
                                    />
                                </section>
                                <WithdrawalTabs
                                    setWithdrawalTab={setWithdrawalTab}
                                    withdrawalTab={withdrawalTab}
                                />
                                {
                                    withdrawalTab.withdrawal ?
                                        (
                                            <section className={`${styles.MainWithdrawalHistory} `} >
                                                <WithdrawalHistory
                                                    withdrawals={withdrawals}
                                                />
                                            </section>
                                        )
                                        :
                                        (
                                            <section className={`${styles.MainWithdrawalHistory} `} >
                                                <ReinvestmentHistory
                                                />
                                            </section>
                                        )
                                }



                            </div>
                        </div>
                    </>
                ) : rol === 'admin' || rol === 'owner' && rol !== 'investor' && rol !== 'sponsored' ? (
                    <>
                        <AdminView
                            user={user}
                            openMenu={openMenu}
                            toggleOpen={toggleOpen}
                            toggleClose={toggleClose}
                            withdrawals={withdrawals}
                        />
                    </>
                ) : null
            }
        </>
    )
}

export default WithdrawalTimeline