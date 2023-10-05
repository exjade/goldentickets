import { useState, useEffect } from 'react';
import { firebase } from '../../../lib/firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const firestore = getFirestore(firebase);

export default function useWeeeklyBookingTickets() {
    const [bookingTickets, setBookingTickets] = useState([]);

    useEffect(() => {
        // Crea una referencia a la colección 'lottery-winners'
        const bookingTicketsRef = collection(firestore, 'weekly-booking-tickets');

        // Crea la función de callback que se ejecutará cuando cambie la colección
        const handleSnapshot = (snapshot) => {
            const numbers = snapshot.docs.map(doc => doc.data());
            // Actualiza el estado con los datos de la colección
            setBookingTickets(numbers);
        };

        // Agrega un oyente para la colección
        const unsub = onSnapshot(bookingTicketsRef, handleSnapshot);

        // Devuelve la función para desuscribirse cuando el componente se desmonte
        return () => unsub();
    }, []);

    return { bookingTickets };
}
