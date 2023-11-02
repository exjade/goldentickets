import { useState, useEffect, useContext, useMemo } from 'react';
import UserContext from '../../../../../context/user';
import { firebase } from '../../../../../lib/firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const firestore = getFirestore(firebase);


const useUnavailableTicketNumbers = () => {
    const [tickets, setTickets] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const comprasRef = collection(firestore, 'loteria', 'weekly-prize', 'compras');

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
    }, [user]);

    const memoizedTickets = useMemo(() => tickets, [tickets]);

    return { tickets: memoizedTickets };
};

export default useUnavailableTicketNumbers;
