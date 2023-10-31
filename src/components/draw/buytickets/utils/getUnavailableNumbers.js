import { useState, useEffect, useContext } from 'react';
import UserContext from '../../../../context/user';
import { firebase } from '../../../../lib/firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const firestore = getFirestore(firebase);


export default function useUnavailableTicketNumbers() {
    const [tickets, setTickets] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const comprasRef = collection(firestore, 'loteria', 'estado', 'compras');

        const handleSnapshot = (querySnapshot) => {
            const ticketData = [];
            querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                    ticketData.push(doc.data().numeroTicket);
                }
            });
            setTickets(ticketData);
        };

        const unsub = onSnapshot(comprasRef, handleSnapshot);

        return () => unsub();
    }, [user])


    return { tickets };
}

