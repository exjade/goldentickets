import React from 'react';
import { Link } from 'react-router-dom'
import styles from './css/last-winners.module.css';
import useLuckyNumbers from '../../hooks/draw/use-luckyNumbers';
import * as ROUTES from '../../constants/routes'


const LastWinners = () => {

    const { luckyNumbers: winners } = useLuckyNumbers()

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.wrapper}`}>

                {/* ==========================  DIVIDER  ========================== */}
                <div className={`${styles.divider}`}></div>

                {/* ==========================  LAST DRAW WINNERS  ========================== */}
                <section className={`${styles.middleContainer}`}>
                    <h2>Last draw <b className={`${styles.middleBold}`}>winners</b> </h2>
                    <p>The lucky ones who won lotteries in GoldenTickets!</p>
                </section>

                {/* ==========================  WINNERS CARD  ========================== */}
                <section className={`${styles.RightContainer}`}>
                    <div className={`${styles.RightWrapper}`}
                    >
                        {
                            winners?.length > 0 ?
                                (
                                    <>
                                        {winners?.map((winner, index) => (
                                            <Link to={ROUTES.DRAW}  key={index}  className={`${styles.cardsWinners}`}>
                                                <div
                                                    className={`${styles.cardsWinners}`}
                                                   >
                                                    {/* AVATAR #1 */}
                                                    <img
                                                        src="https://media.istockphoto.com/id/1344327532/photo/studio-portrait-of-attractive-19-year-old-woman-with-brown-hair.jpg?s=170667a&w=0&k=20&c=vMm9k7T5KOGiy0lGrXOOp2UWUR4sIplBQw-Dubd2lWA="
                                                        alt="image"
                                                        className={styles.image}
                                                    />
                                                    <h4>{`#${index + 1}`}</h4>
                                                    <h3>{winner.username}</h3>
                                                    <p>{`Number ${winner.numeroGanador}`}</p>
                                                </div>
                                            </Link>
                                        ))}
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
