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

export default function useUsers() {
    //eslint-disable-next-line 
    const { user: { uid: currentUserUID } } = useContext(UserContext)

    const [users, setUsers] = useState([])

    useEffect(() => {
        const usersRef = collection(firestore, 'users');

        const q = query(usersRef, where('userId', 'not-in', [currentUserUID]));

        const unsuscribe = onSnapshot(q, (querySnapshot) => {

            const users = [];
            querySnapshot.forEach(doc => {
                users.push({
                    ...doc.data(),
                    id: doc.id
                })
            })

            setUsers(users)
        })
        return () => unsuscribe()
    }, [])
    return { users }
}