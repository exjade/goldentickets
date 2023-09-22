import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Error from '../../error/error';
import Header from '../../components/Header/landing';
import styles from './css/auth.module.css';
import Footer from '../../components/footer/footer';

const ResetPassword = () => {
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
                
                <div className={`${styles.forgotContainer}`} >
                    <div className={`${styles.forgotWrapper}`} >

                        <section className={`${styles.forgotRight}`} >
                            <AnimatePresence>
                                <motion.div
                                    className={`${styles.forgotWrapper}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}>


                                    <form
                                        // onSubmit={handleLogin}
                                        method="POST"
                                        className={`${styles.formForgot}`}>

                                        <span className={`${styles.title}`} >
                                            Reset Password
                                        </span>

                                        <div className={`${styles.inputContainer}`} >
                                            <label
                                                htmlFor='Enter your email address'
                                                className={`${styles.label}`}
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                aria-label="Enter your email address"
                                                className={`${styles.input}`}
                                            // onChange={({ target }) => setEmailAddress(target.value)}
                                            />
                                        </div>

                                        <motion.button
                                            type='submit'
                                            className={`bg-blue-button hover:bg-blue-feedback flex items-center justify-center w-full text-white-normal rounded h-14 mt-3 font-bold text-xl `}
                                            whileTap={{ scale: 0.9 }}
                                        // disabled={isInvalid}
                                        >
                                            Login
                                        </motion.button>
                                    </form>

                                </motion.div>
                            </AnimatePresence>
                        </section>

                    </div>
                </div>

                <Footer />

            </motion.div>
        </AnimatePresence>
    )
}

export default ResetPassword