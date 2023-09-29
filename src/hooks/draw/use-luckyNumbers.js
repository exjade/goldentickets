import { useState, useEffect, useContext } from 'react';
import { firebase } from '../../lib/firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const firestore = getFirestore(firebase);

export default function useLuckyNumbers() {
    const [luckyNumbers, setLuckyNumbers] = useState([]);

    useEffect(() => {
        // Crea una referencia a la colección 'lottery-winners'
        const luckyNumbersRef = collection(firestore, 'lottery-winners');

        // Crea la función de callback que se ejecutará cuando cambie la colección
        const handleSnapshot = (snapshot) => {
            const numbers = snapshot.docs.map(doc => doc.data());
            // Actualiza el estado con los datos de la colección
            setLuckyNumbers(numbers);
        };

        // Agrega un oyente para la colección
        const unsub = onSnapshot(luckyNumbersRef, handleSnapshot);

        // Devuelve la función para desuscribirse cuando el componente se desmonte
        return () => unsub();
    }, []); 

    return { luckyNumbers };
}
