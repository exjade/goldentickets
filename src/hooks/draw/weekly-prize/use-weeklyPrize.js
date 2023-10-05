import { useState, useEffect, useContext } from 'react';
import UserContext from '../../../context/user';
import { firebase } from '../../../lib/firebase';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const firestore = getFirestore(firebase);

export default function useWeeklyLottery() {
    const [loterry, setLottery] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        // Crea una referencia al documento 'estado' en la colección 'loteria'
        const loteriaDocRef = doc(firestore, 'loteria', 'weekly-prize');


        // Crea la función de callback que se ejecutará cuando cambie el documento
        const handleSnapshot = (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                // Actualiza el estado con los datos del documento
                setLottery([data]); // Usamos un array con el dato
            } else {
                // El documento no existe
                setLottery([]);
                console.log('El documento no existe');
            }
        };

        // Agrega un oyente para el documento
        const unsub = onSnapshot(loteriaDocRef, handleSnapshot);

        // Devuelve la función para desuscribirse cuando el componente se desmonte
        return () => unsub();
    }, [user]);


   

    return { loterry };
}
