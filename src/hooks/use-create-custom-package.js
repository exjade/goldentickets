import { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import shortid from 'shortid';
import { firebase } from '../lib/firebase'
import {
    getFirestore,
    collection,
    addDoc,
} from 'firebase/firestore';
const firestore = getFirestore(firebase)

export default function useCreateCustomPayment({
    customPriceAmount,
    activeUser,
    setError,
    resetBalanceUSDT
}) {
    const customOrderId = shortid.generate().trim();
    const [customPayment, setCustomPayment] = useState([])
    /* =========================== AUTH ======================================== */
    useEffect(() => {
        //eslint-disable-next-line
        const getToken = async () => {
            const res = await axios.get(process.env.REACT_APP_NOWPAYMENTS_TKN)
            localStorage.setItem('token', res.data.token);
        }
        getToken()
    }, [])

    //eslint-disable-next-line
    const tkn = localStorage.getItem('token')
    /* =========================== AUTH ======================================== */
    var myHeaders = new Headers();
    myHeaders.append('x-api-key', process.env.REACT_APP_NOWPAYMENTS_API)
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Bearer ${tkn}`);

    var raw = JSON.stringify({
        'price_amount': parseFloat(customPriceAmount),
        'price_currency': 'usd',
        'pay_currency': 'usdttrc20',
        'ipn_callback_url': 'https://davi-pro-capital.web.app/account/wallet',
        'order_id': customOrderId,
        'order_description': 'Artificial Top Up Balance',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    const condition = parseInt(customPriceAmount) > 1;

    const memoizedValue = useMemo(() => {
        const depositBalance = []

        const getPaymentData = async () => {
            try {
                //eslint-disable-next-line
                if (condition) {
                    //eslint-disable-next-line
                    const payment = fetch('https://api.nowpayments.io/v1/payment', requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            setCustomPayment(result)
                            depositBalance.push(result)
                        })
                        .catch(error => console.log('error', error));
                }
            } catch (error) {
                console.log(error)
            }
        }

        const createDepositTicket = async () => {
            try {
                if (depositBalance.length > 0 || depositBalance !== [] && condition) {
                    //eslint-disable-next-line
                    const docRef = await addDoc(collection(firestore, 'deposits'), {
                        currency: 'USDT (TRC20)',
                        amount: parseFloat(customPriceAmount),
                        date: Date.now(),
                        userId: activeUser.userId,
                        username: activeUser.username,
                        id: shortid.generate().trim(),
                        status: 'NEW',
                        depositBalance,
                    });
                    resetBalanceUSDT()
                } else {
                    //eslint-disable-next-line
                    const docRef = await addDoc(collection(firestore, 'trash-deposit'), {
                        currency: 'USDT (TRC20)',
                        amount: parseFloat(customPriceAmount),
                        date: Date.now(),
                        userId: activeUser.userId,
                        username: activeUser.username,
                        id: shortid.generate().trim(),
                        status: 'NEW',
                        depositBalance,
                    });
                }
                resetBalanceUSDT()
            } catch (error) {
                setError('Please, Try again later')
            }
        }
        if (depositBalance.length > 0 ||
            depositBalance !== [] ||
            condition ||
            customPayment.length > 0 ||
            customPayment !== []
        ) {
            setTimeout(() => {
                createDepositTicket();
            }, 5000)
        }
        return getPaymentData();
    }, [customPriceAmount]);


    useEffect(() => {
        if (condition) {
            return memoizedValue
        }
    }, [customPriceAmount])


    return { customPayment }

}