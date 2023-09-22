import React, { useState, useEffect, useContext } from 'react';
import styles from './css/auth.module.css';
import Header from '../../components/Header/auth';
import Error from '../../error/error';
import * as ROUTES from '../../constants/routes';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../../context/firebase';


const Login = () => {

    useEffect(() => {
        document.title = 'Login | GOLDENTICKETS.CLUB';
    }, []); //eslint-disable-line

    // Push to another route
    const history = useHistory();
    // Auth Context
    const { firebase } = useContext(FirebaseContext);
    // Login States
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    // Error Handlers
    const [error, setError] = useState('');
    const isInvalid = password === '' && password?.length >= 4 || emailAddress === '' && emailAddress?.length >= 6;

    /*=========================== Auth with Email & Password  ===========================*/
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                if (!isInvalid) setPassword('');
                setError('');
            }, 2500);
        }
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

                <div className={`${styles.container}`} >
                    <div className={`${styles.wrapper}`} >

                        <section className={`${styles.backgroundImage}`} >
                            <div className={`${styles.welcomeContainer}`}>
                                <h2>Welcome Back!</h2>
                                <p>The herd awaits you</p>
                            </div>
                        </section>

                        <section className={`${styles.loginRight}`} >
                            <AnimatePresence>
                                <motion.div
                                    className={`${styles.loginWrapper}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}>


                                    <form
                                        onSubmit={handleLogin}
                                        method="POST"
                                        className={`${styles.form}`}>

                                        <span className={`${styles.title}`} >
                                            Login
                                        </span>

                                        {/* Auth Error message */}
                                        {
                                            error &&
                                            <p className='mb-4 text-xs text-blue-createAccount'>
                                                {error}
                                            </p>
                                        }

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
                                        <div className={`${styles.inputContainer}`}>
                                            <label
                                                htmlFor='Enter your password'
                                                className={`${styles.label}`}
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                aria-label="Enter your password"
                                                className={`${styles.input}`}
                                                value={password}
                                                onChange={({ target }) => setPassword(target.value)}
                                            />
                                        </div>

                                        <motion.button
                                            type='submit'
                                            className={`bg-blue-button hover:bg-blue-feedback flex items-center justify-center w-full text-white-normal rounded h-14 mt-3 font-bold text-xl ${isInvalid && 'cursor-not-allowed '}`}
                                            whileTap={{ scale: 0.9 }}
                                            disabled={isInvalid}
                                        >
                                            Login
                                        </motion.button>
                                    </form>

                                    <div className={`flex justify-center items-center flex-col bg-white p-4`} >
                                        <p className='text-sm text-center'>
                                            <Link
                                                to={ROUTES.RECOVER_PASSWORD}
                                                className='text-blue-h4 font-bold text-lg'>
                                                Forgot your password?
                                            </Link>
                                        </p>
                                    </div>

                                </motion.div>
                            </AnimatePresence>
                        </section>

                    </div>
                </div>

            </motion.div>
        </AnimatePresence >
    )
}

export default Login