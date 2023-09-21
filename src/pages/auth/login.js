import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header/auth';
import Error from '../../error/error';

const Login = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Error>
                    <Header />
                </Error>

            </motion.div>
        </AnimatePresence>
    )
}

export default Login