import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
} from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function useDeposits() {
    const { user: { uid: currentUserUID } } = useContext(UserContext)

    const [deposits, setDeposits] = useState([])

    useEffect(() => {

        const q = query(collection(firestore, 'deposits'), where('userId', '==', currentUserUID));

        const unsuscribe = onSnapshot(q, (querySnapshot) => {

            const currencies = [];
            querySnapshot.forEach(doc => {
                currencies.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setDeposits(currencies)
        })
        return () => unsuscribe()
    }, [])

    return { deposits }
}