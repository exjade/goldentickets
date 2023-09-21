import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header/auth/register';
import Error from '../../error/error';

const SignUp = () => {
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

export default SignUp