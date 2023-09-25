import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useCreatePayment({
    amount,
    currency,
    generateQr,
    orderId,
}) {

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


    const getPaymentData = async () => {
        try {
            //eslint-disable-next-line
            const payment = fetch('https://api.nowpayments.io/v1/payment', requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPay(result)
                    console.log(result);
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (amount > 1 && generateQr) {
            getPaymentData()
        }
    }, [amount, generateQr, currency])

    return { pay }

}