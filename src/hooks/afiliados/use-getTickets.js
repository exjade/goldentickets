import { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/user';
import { firebase } from '../../lib/firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import useUser from '../use-user';
import { getDailySellerCode } from '../../services/firebase';

const firestore = getFirestore(firebase);

export default function useGetTickets() {
    const [tickets, setTickets] = useState([]);
    const [tickets2, setTickets2] = useState([]);
    const [items, setItems] = useState([]);
    const [comision, setComision] = useState(null);
    const { user } = useContext(UserContext);
    const { user: activeUser } = useUser();


    const handleSnapshot = (querySnapshot) => {
        const ticketData = [];
        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
                ticketData?.push(doc.data());
            }
        });
        setTickets(ticketData);
    };

    const handleSnapshot2 = (querySnapshot) => {
        const ticketData = [];
        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
                ticketData?.push(doc.data());
            }
        });
        setTickets2(ticketData);
    };


    useEffect(() => {
        const tickets1Ref = collection(firestore, 'vault-tickets');
        const tickets2Ref = collection(firestore, 'weekly-vault-tickets');

        const unsub = onSnapshot(tickets1Ref, handleSnapshot);
        const unsub2 = onSnapshot(tickets2Ref, handleSnapshot2);

        return () => {
            unsub();
            unsub2()
        };
    }, [user]);


    const getSellerCode = async () => {
        try {
            const sellerId = activeUser?.userId;
            const resultado = await getDailySellerCode(sellerId);

            if (resultado && resultado.length > 0) {
                return resultado[0].dailyCode;
            } else {
                return null; // O algún valor predeterminado que desees retornar
            }
        } catch (error) {
            console.error('Error al obtener el código diario:', error);
            throw error; // Re-lanza el error para que pueda ser manejado más arriba si es necesario
        }
    };

    useEffect(() => {
        const newResult = tickets?.concat(tickets2);


        const sellerCode = async () => {
            const code = await getSellerCode()
            const userResult = newResult?.filter(ticket => ticket.sellerCode === code)
            const orderAsc = userResult.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
            const sumaNumeroTicket = userResult?.reduce((acumulador, ticket) => acumulador + (ticket.costoTicket || 0), 0);
            const comision = sumaNumeroTicket * 0.2;
            setComision(comision)

            setItems(orderAsc);
        }

        sellerCode()
    }, [tickets, tickets2]);

    return { items, comision };
}
