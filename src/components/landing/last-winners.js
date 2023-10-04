import React from 'react';
import { Link } from 'react-router-dom'
import styles from './css/last-winners.module.css';
import useLuckyNumbers from '../../hooks/draw/use-luckyNumbers';
import * as ROUTES from '../../constants/routes'


const LastWinners = () => {

    const { luckyNumbers: winners } = useLuckyNumbers()

    const orderByDate = winners?.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
    })

    const lastWinner = orderByDate?.at(-1)
    const previousWinner = orderByDate?.at(-2)
    const bronzeWinner = orderByDate?.at(-3)


    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.wrapper}`}>

                {/* ==========================  DIVIDER  ========================== */}
                <div className={`${styles.divider}`}></div>

                {/* ==========================  LAST DRAW WINNERS  ========================== */}
                <section className={`${styles.middleContainer}`}>
                    <h2>Last draw <b className={`${styles.middleBold}`}>winners</b> </h2>
                    <p>The lucky ones who won lotteries in GoldenTickets!</p>
                    <Link to={ROUTES.DRAW}>
                        <p
                            type='button'
                            className='bg-blue-button text-white-normal w-44 h-4 flex justify-center items-center p-6 rounded-md'
                        >
                            View last winner
                        </p>
                    </Link>
                </section>

                {/* ==========================  WINNERS CARD  ========================== */}
                <section className={`${styles.RightContainer}`}>
                    <div className={`${styles.RightWrapper}`}
                    >
                        {
                            orderByDate?.length > 0 ?
                                (
                                    <>

                                        <div
                                            className={`${styles.cardsWinners} border-gray-plata border-2 ${styles.platinum}`}
                                        >
                                            {/* AVATAR #1 */}

                                            <img
                                                src="https://www.pngmart.com/files/9/Award-Badge-PNG-Photos.png"
                                                alt="image"
                                                className={styles.image}
                                            />
                                            <h3 >{bronzeWinner?.username}</h3>
                                            <p>Number {bronzeWinner?.numeroGanador}</p>
                                        </div>
                                        <div
                                            className={`${styles.cardsWinners} border-yellow-gold border-2 ${styles.gold} `}
                                        >
                                            {/* AVATAR #1 */}
                                            <img
                                                src="https://www.pngmart.com/files/9/Award-Badge-PNG-Photos.png"
                                                alt="image"
                                                className={styles.image}
                                            />
                                            <h4>Last winner</h4>
                                            <h3 className='uppercase'>{lastWinner?.username}</h3>
                                            <p>Number {lastWinner?.numeroGanador}</p>
                                        </div>
                                        <div
                                            className={`${styles.cardsWinners} border-brown-bronze border-2  ${styles.bronze}`}
                                        >
                                            {/* AVATAR #1 */}
                                            <img
                                                src="https://www.pngmart.com/files/9/Award-Badge-PNG-Photos.png"
                                                alt="image"
                                                className={styles.image}
                                            />
                                            <h3 >{previousWinner?.username}</h3>
                                            <p>Number {previousWinner?.numeroGanador}</p>
                                        </div>

                                    </>
                                )
                                :
                                (
                                    <>
                                        <div
                                            className={`${styles.cardsWinners} animate-pulse bg-blue-tertiary`}
                                        ></div>
                                        <div
                                            className={`${styles.cardsWinners} animate-pulse bg-blue-tertiary`}
                                        ></div>
                                        <div
                                            className={`${styles.cardsWinners} animate-pulse bg-blue-tertiary`}
                                        ></div>
                                    </>
                                )
                        }

                    </div>



                </section>

            </div>
        </div>
    );
};

export default LastWinners;
