import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header/auth';
import Error from '../../error/error';
import styles from './css/auth.module.css'

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

                <div className={`${styles.container}`} >
                    <div className={`${styles.wrapper}`} >

                        <section className={`${styles.backgroundImage}`} >
                            <div className={`${styles.welcomeContainer}`}>
                                <h2>Welcome Back!</h2>
                                <p>The herd awaits you</p>
                            </div>
                        </section>

                        <section className={`${styles.loginRight}`} >
                            .
                        </section>

                    </div>
                </div>

            </motion.div>
        </AnimatePresence>
    )
}

export default Login