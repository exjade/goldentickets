import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as ROUTES from '../../constants/routes'
import Error from '../../error/error';
import Header from '../../components/Header/landing';
import styles from './css/auth.module.css';
import Footer from '../../components/footer/footer';
//firebase
import { firebase } from '../../lib/firebase';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
const auth = getAuth(firebase);

const ResetPassword = () => {

    useEffect(() => { document.title = 'Reset Password | GOLDENTICKETS.CLUB' }, []); //eslint-disable-line
    const history = useHistory();
    const [emailAddress, setEmailAddress] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const isInvalid = emailAddress === '';

    const ForgotPassword = (emailAddress) => {
        return sendPasswordResetEmail(auth, emailAddress, {
            url: 'http://localhost:3000/login',
        });
    }

    const handleOnsubmit = async (event) => {
        event.preventDefault();
        ForgotPassword(emailAddress)
            .then(response => {
                console.log(response)
                setSuccess('Email sent successfully, please check your email');
                setTimeout(() => { history.push(ROUTES.LOGIN) }, 3000);
            })
            .catch(e => {
                console.log(e.message)
                setError('Email not found')
            })
        setTimeout(() => {
            setEmailAddress('')
            setError('')
        }, 2500);
    }

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
                                        onSubmit={handleOnsubmit}
                                        method="POST"
                                        className={`${styles.formForgot}`}>

                                        <span className={`${styles.title}`} >
                                            Reset Password
                                        </span>

                                        {error &&
                                            <p
                                                className='mb-4 text-xl font-semibold text-pink-primary'
                                                value={error}
                                            >
                                                {error}
                                            </p>}
                                        {success &&
                                            <p
                                                className='mb-4 text-xl font-semibold text-green-primary'
                                                value={success}
                                            >
                                                {success}
                                            </p>}

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
                                                onChange={({ target }) => setEmailAddress(target.value)}
                                            />
                                        </div>

                                        <motion.button
                                            type='submit'
                                            className={`bg-blue-button hover:bg-blue-feedback flex items-center justify-center w-full text-white-normal rounded h-14 mt-3 font-bold text-xl `}
                                            whileTap={{ scale: 0.9 }}
                                            disabled={isInvalid}
                                        >
                                            Reset
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