import { useState } from 'react'
import shortid from 'shortid';
//custom hooks
import useMenu from '../../hooks/use-menu'
import useUser from '../../hooks/use-user'
import useWithdrawals from '../../hooks/use-withdrawals'
//components
import AdminView from './adminView'
//eslint-disable-next-line
import styles from '../../styles/modules/withdrawal/withdrawal.module.css';
//firebase
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const WithdrawalTimeline = () => {

    const { user,
        user: {
            userId, fullName,
            emailAddress,
            wallet,
            Balance,
            rol,
        } } = useUser()
    const { openMenu, toggleOpen, toggleClose } = useMenu()
    const { withdrawals } = useWithdrawals()
    //eslint-disable-next-line no-unused-vars
    const orderByDate = withdrawals.sort((a, b) => {
        return new Date(b.WithdrawalDate) - new Date(a.WithdrawalDate)
    })
    //eslint-disable-next-line 
    const [loader, setLoader] = useState(false);
    //eslint-disable-next-line 
    const [loaderError, setLoaderError] = useState('');
    //eslint-disable-next-line 
    const [isInvalid, setIsInvalid] = useState(false);
    
    
    const [withdrawalAmount, setWithdrawalAmount] = useState(0)
    //eslint-disable-next-line 
    const [withdrawalAmountError, setWithdrawalAmountError] = useState('')
    
    //eslint-disable-next-line 
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

    return (
        <>
            {
                rol === 'admin' || rol === 'owner' && rol !== 'Member' && rol !== 'guest' ? (
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