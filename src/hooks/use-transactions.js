import { useState } from 'react';

export default function useTransactions() {
    const [transactionSearch, setTransactionSearch] = useState('');


    return { transactionSearch, setTransactionSearch }
}