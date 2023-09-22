import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header/auth/register';
import Error from '../../error/error';
import styles from './css/auth.module.css';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

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

                <div className={`${styles.container}`} >
                    <div className={`${styles.wrapper}`} >

                        <section className={`${styles.backgroundImageSignup}`} >
                            <div className={`${styles.welcomeContainerSignup}`}>
                                <h2 className=' text-lg '>
                                    JOIN THE DAILY $1000 RACE!
                                </h2>
                                <span className={`${styles.subText}`} >
                                    <p>NEW PLAYERS LAST WEEK</p>
                                    <p>WAGERED LAST WEEK</p>
                                </span>
                            </div>
                        </section>

                        <section className={`${styles.signupRight}`} >
                            <AnimatePresence>
                                <motion.div
                                    className={`${styles.loginWrapper}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}>


                                    <form
                                        // onSubmit={handleLogin}
                                        method="POST"
                                        className={`${styles.form}`}>

                                        <span className={`${styles.title}`} >
                                            Register
                                        </span>

                                        <div className={`${styles.inputContainer}`} >
                                            <label
                                                htmlFor='Enter your username'
                                                className={`${styles.label}`}
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                aria-label="Enter your username"
                                                placeholder="Type your username"
                                                className={`${styles.input}`}
                                            // onChange={({ target }) => setUsername(target.value)}
                                            />
                                            <p className={`${styles.limited}`}>
                                                min. 4, max 20, only letters and number
                                            </p>
                                        </div>

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
                                                placeholder="Type your email address"
                                                className={`${styles.input}`}
                                            // onChange={({ target }) => setEmailAddress(target.value)}
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
                                                placeholder="Type password"
                                                className={`${styles.input}`}
                                            // value={password}
                                            // onChange={({ target }) => setPassword(target.value)}
                                            />
                                            <p className={`${styles.limited}`}>
                                                min. 6, only letters with numbers or symbols
                                            </p>
                                        </div>

                                        <div className={`${styles.inputTerms}`}>
                                            <input
                                                type="checkbox"
                                                aria-label="Enter your password"
                                                placeholder="Type password"
                                                className={`${styles.terms}`}
                                            // value={password}
                                            // onChange={({ target }) => setPassword(target.value)}
                                            />
                                            <p className={`${styles.termsCondition}`}>
                                                I am over 18 years of age and I agree to the
                                                <b className='text-blue-terms ml-2'>Terms of Service</b>
                                            </p>
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
        </AnimatePresence>
    )
}

export default SignUp