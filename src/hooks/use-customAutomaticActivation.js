import { useState, useEffect } from 'react'
import useUser from './use-user';
import axios from 'axios';
import { firebase } from '../lib/firebase'
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
const firestore = getFirestore(firebase)

export default function useCustomAutomaticActivation() {
    const { user } = useUser()
    const [customNowpayments, setCustomNowPayments] = useState(null)
    const [customPaymentAwaitingInfo, setCustomPaymentAwaitingInfo] = useState([])
    const [customPaymentAwaiting, setCustomPaymentAwaiting] = useState([])

    /* =========================== AUTH ======================================== */

    useEffect(() => {
        const getToken = async () => {
            const res = await axios.get(process.env.REACT_APP_NOWPAYMENTS_TKN)
            localStorage.setItem('token', res.data.token);
        }
        getToken()
    }, [user])


    /* =========================== AUTH ======================================== */

    const tkn = localStorage.getItem('token')

    var myHeaders = new Headers();
    myHeaders.append('x-api-key', process.env.REACT_APP_NOWPAYMENTS_API);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${tkn}`);

    //eslint-disable-next-line

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };


    const getCustomPaymentDoc = async () => {
        try {
            const q2 = query(collection(firestore, 'payments'), where('status', '==', 'NEW'));
            const querySnapshot = await getDocs(q2);
            querySnapshot.forEach((doc) => {
                setCustomPaymentAwaitingInfo({
                    docId: doc.id, data: doc.data()
                })
                setCustomPaymentAwaiting(doc.data()?.customNowpayments?.paymentId)
            });
        } catch (error) {
            console.log(error)
        }
    }


    const getCustomPaymentStatus = async () => {
        try {
            await getCustomPaymentDoc()
            // eslint-disable-next-line
            fetch(`https://api.nowpayments.io/v1/payment/${customPaymentAwaiting}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setCustomNowPayments(result.data)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }


    const activateInvestment = async () => {
        try {

            await getCustomPaymentDoc()
            await getCustomPaymentStatus()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomPaymentDoc()
        if (customPaymentAwaiting !== undefined || customPaymentAwaiting !== []) {
            getCustomPaymentStatus()
            activateInvestment()
        }
    }, [user])

    return {
        customNowpayments,
        customPaymentAwaiting,
        customPaymentAwaitingInfo,
    }

}