import { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import useAuthListener from './use-auth-listener';
import { firebase } from '../lib/firebase'
import {
    getFirestore,
    collection,
    addDoc,
} from 'firebase/firestore';
const firestore = getFirestore(firebase)

export default function useCreatePayment({
    amount,
    currency,
    generateQr,
    orderId,
    setError,
}) {
    const { user } = useAuthListener()
    const [pay, setPay] = useState([])

    /* =========================== AUTH ======================================== */

    useEffect(() => {
        //eslint-disable-next-line
        const getToken = async () => {
            const res = await axios.get(process.env.REACT_APP_NOWPAYMENTS_TKN)
            localStorage.setItem('token', res.data.token);
        }
        // getToken()
    }, [])

    //eslint-disable-next-line
    const tkn = localStorage.getItem('token')
    /* =========================== AUTH ======================================== */

    var myHeaders = new Headers();
    myHeaders.append('x-api-key', process.env.REACT_APP_NOWPAYMENTS_API)
    myHeaders.append('Content-Type', 'application/json')
    // myHeaders.append('Authorization', `Bearer ${tkn}`);

    var raw = JSON.stringify({
        'price_amount': parseFloat(amount),
        'price_currency': 'usd',
        'pay_currency': currency,
        'ipn_callback_url': 'https://goldentickets.club/wallet',
        'order_id': orderId,
        'order_description': 'goldenTickets.club',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    // minimum deposit amount
    const minimumAmount = parseInt(amount) > 0.99;

    const memoizedValue = useMemo(() => {
        const depositBalance = []

        // Obtain payment object
        const getPaymentData = async () => {
            try {
                //eslint-disable-next-line
                const payment = fetch('https://api.nowpayments.io/v1/payment', requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setPay(result)
                        depositBalance.push(result)
                        console.log(result);
                        setTimeout(() => {
                            createDepositTicket();
                        }, 1000)
                    })
                    .catch(error => console.log('error', error));
            } catch (error) {
                console.log(error)
            }
        }

        // Store deposit log in the database
        const createDepositTicket = async () => {
            try {
                if (depositBalance.length > 0 && minimumAmount && generateQr && currency !== undefined || currency !== '') {
                    //eslint-disable-next-line
                    const docRef = await addDoc(collection(firestore, 'deposits'), {
                        currency: 'crypto2crypto',
                        amount: parseFloat(amount),
                        date: Date.now(),
                        userId: user?.uid,
                        username: user?.displayName,
                        email: user?.email,
                        id: orderId,
                        status: 'NEW',
                        depositBalance,
                    });
                } else {
                    //eslint-disable-next-line
                    const docRef = await addDoc(collection(firestore, 'trash-deposit'), {
                        currency: 'crypto2crypto',
                        amount: parseFloat(amount),
                        date: Date.now(),
                        userId: user?.uid,
                        username: user?.displayName,
                        email: user?.email,
                        id: orderId,
                        status: 'NEW',
                        depositBalance,
                    });
                    setError('Please, Try again later')
                }
            } catch (error) {
                setError('Please, Try again later')
            }
        }

        if (minimumAmount && generateQr) {
            return getPaymentData();
        }
    }, [amount, generateQr, currency]);


    useEffect(() => {

        if (minimumAmount && generateQr) {
            return memoizedValue
        }
    }, [amount, generateQr, currency])

    return { pay }

}