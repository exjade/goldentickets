import React from 'react';
import styles from './css/buytickets.module.css';

const Tickets = () => {


    const numbersComplete = Array.from({ length: 100 }, (_, i) => i + 1);

    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`} >


                {/*================ Sección izquierda ================*/}
                {/* TITULO */}
                {/* SUBTITULO */}
                {/* CUENTA ATRÁS DE SORTEO */}

                <section className={`${styles.leftContainer}`} >
                    <h2>Pick your <b className={`${styles.leftBold}`}>lucky</b> number</h2>

            
                </section>


                {/*================ Sección central ================*/}

                {/* NÚMEROS DEL 1 - 100 */}

                <section className={`${styles.middleContainer}`} >
                    <div className={`${styles.middleWrapper}`}>


                        {numbersComplete.map((number) => (
                            <span
                                key={number}
                                className={`${styles.middleCircle}`}
                            >
                                <p className={`${styles.middleNumber}`}>{number}</p>
                            </span>
                        ))}


                    </div>
                </section>

                {/*================ Sección derecha ================*/}
                <section className={`${styles.rightContainer}`} >
                    <div className={`${styles.rightWrapper}`}>

                        {/* TITLE */}
                        <span className={`${styles.rightTitle}`}>
                            Lotto ticket's
                        </span>

                        {/* TICKET SELECCIONADO */}
                        <div className={`${styles.rightTicket}`} >
                            <span
                                className={`${styles.middleCircle}`}
                            >
                                <p className={`${styles.middleNumber}`}>1</p>
                            </span>
                            <span
                                className={`${styles.middleCircle}`}
                            >
                                <p className={`${styles.middleNumber}`}>2</p>
                            </span>
                        </div>

                        {/* DETALLES DE COMPRA */}
                        <div className={`${styles.rightSummary}`} >
                            <span className={`${styles.rightDetails}`}>
                                <p>Costo de ticket</p>
                                <p>$1 USD</p>
                            </span>
                            <span className={`${styles.rightDetails}`}>
                                <p>Comisión</p>
                                <p>$1 USD</p>
                            </span>
                            <span className={`${styles.rightDetails}`}>
                                <p>Total</p>
                                <p>$2 USD</p>
                            </span>
                        </div>

                        {/* BUTÓN DE COMPRAR */}
                        <button
                            type='button'
                            className={`${styles.rightButton}`}
                        >
                            Comprar
                        </button>
                    </div>
                </section>


            </div>
        </div>
    )
}

export default Tickets