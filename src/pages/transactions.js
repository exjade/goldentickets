import React, { useState } from 'react'
//framer motion
import { motion, AnimatePresence } from 'framer-motion'
//components
import TransactionTimeline from '../components/transactions/transaction-timeline'
//hooks
import useTransactions from '../hooks/use-transactions'
//Proptypes
import PropTypes from 'prop-types'
//error
import Error from '../error/error'

const Transaction = () => {


    const { transactionSearch, setTransactionSearch } = useTransactions()
    // menu functionality
    const [isOpen, setIsOpen] = useState(false)

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >

                <Error>
                    <TransactionTimeline
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        transactionSearch={transactionSearch}
                        setTransactionSearch={setTransactionSearch}
                    />
                </Error>
            </motion.div>
        </AnimatePresence>
    )
}

export default Transaction

Transaction.propTypes = {
    setSearch: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    theme: PropTypes.bool,
    setTheme: PropTypes.func
}