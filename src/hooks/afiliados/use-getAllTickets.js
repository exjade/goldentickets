import { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/user';
import { firebase } from '../../lib/firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import useUser from '../use-user';

const firestore = getFirestore(firebase);

export default function useGetAllTickets() {

    const { user: activeUser } = useUser();
    const { user } = useContext(UserContext);
    const [tickets, setTickets] = useState([]);
    const [tickets2, setTickets2] = useState([]);
    const [items, setItems] = useState([]);


    const [afiliados, setAfiliados] = useState(null);
    const [comision, setComision] = useState(null);
    const [ingresoNeto, setIngresoNeto] = useState(null);
    const [ingresoBruto, setIngresoBruto] = useState(null);


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




    useEffect(() => {
        const newResult = tickets?.concat(tickets2);


        const calculate = async () => {
            const orderAsc = newResult.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

            // Costo de tickets
            const sumaNumeroTicket = orderAsc?.reduce((acumulador, ticket) => acumulador + (ticket.costoTicket || 0), 0);

            // Afiliados
            const Afiliados = sumaNumeroTicket * 0.2;
            setAfiliados(Afiliados)
            //Comision
            const comision = (sumaNumeroTicket - Afiliados) * 0.30;
            setComision(comision)
            // Ingreso bruto
            setIngresoBruto(sumaNumeroTicket)
            // Ingreso neto
            const neto = (sumaNumeroTicket - comision - afiliados);
            setIngresoNeto(neto)
            // Tickets
            setItems(orderAsc);
        }

        calculate()
    }, [tickets, tickets2]);

    return { items, afiliados, comision, ingresoNeto, ingresoBruto };
}
