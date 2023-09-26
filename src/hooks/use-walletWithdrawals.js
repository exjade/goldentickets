import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function useWalletWithdrawals() {
    const [withdrawals, setWithdrawals] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {

        async function getWithdrawals() {
            let w = []
            const querySnapshot = await getDocs(collection(firestore, 'wallet-withdrawals'));
            querySnapshot.forEach((doc) => {
                w.push(
                    {
                        ...doc.data(),
                        docId: doc.id
                    }
                )
            });
            setWithdrawals(w)
        }
        if (withdrawals) {
            getWithdrawals()
        }
        return () => {
            setWithdrawals([])
        }
    }, [user])

    return { withdrawals }
}