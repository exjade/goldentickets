import { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/user';
import { firebase } from '../../lib/firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const firestore = getFirestore(firebase);

export default function useUserTickets() {
    const [tickets, setTickets] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        // Crea una referencia a la subcolección 'compras' en la colección 'loteria'
        const comprasRef = collection(firestore, 'loteria', 'estado', 'compras');

        // Crea la función de callback que se ejecutará cuando cambie la subcolección
        const handleSnapshot = (querySnapshot) => {
            const ticketData = [];
            querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                    // Agrega los datos de cada documento a la matriz
                    ticketData.push(doc.data());
                }
            });
            // Actualiza el estado con los datos de la subcolección
            setTickets(ticketData);
        };

        // Agrega un oyente para la subcolección
        const unsub = onSnapshot(comprasRef, handleSnapshot);

        // Devuelve la función para desuscribirse cuando el componente se desmonte
        return () => unsub();
    }, [user]);

    return { tickets };
}
